// Photo watcher: when a photo named like a site photo (for example showers-card.jpg) is pasted anywhere in the
// project, it is swapped into images/, the site is rebuilt and pushed to GitHub. That covers "replace donot push/",
// pasting straight over a photo in images/ (any of .jpg, .png or .webp) and any other folder such as pics/.
// Start with: npm run watch-photos  (leave the window open). What happened is written to replace-log.txt in "replace donot push/".
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const DROP = path.join(ROOT, 'replace donot push');
const IMAGES = path.join(ROOT, 'images');
const MANIFEST = path.join(IMAGES, '.converted.json');
const LOG = path.join(DROP, 'replace-log.txt');
const EXT = /\.(jpe?g|png|webp)$/i;
const WAIT = 5000; // let files finish copying before using them
// Folders whose photos are never swapped in: site output, tools and set-aside photos
const IGNORE = ['public', 'node_modules', '.git', '.playwright-mcp', 'unused-images'];

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.name.startsWith('.') ? [] : e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const hash = (file) => crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex');
const baseName = (file) => path.basename(file).replace(EXT, '').toLowerCase();
const isFile = (f) => { try { return fs.statSync(f).isFile(); } catch { return false; } };
const mtime = (f) => fs.statSync(f).mtimeMs;
const inside = (dir, f) => !path.relative(dir, f).startsWith('..');
const run = (cmd, args) => execFileSync(cmd, args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

function log(msg) {
  const line = `${new Date().toLocaleString()}  ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG, line + '\n');
}

// Site photos in images/ by name. A photo pasted next to the old one with another ending
// (home-card.png beside home-card.jpg) or capital letters wins: the older copy is deleted.
function sitePhotos() {
  const byName = {};
  walk(IMAGES).filter((f) => EXT.test(f)).forEach((f) => (byName[baseName(f)] ||= []).push(f));
  const site = {};
  for (const [name, list] of Object.entries(byName)) {
    list.sort((a, b) => mtime(b) - mtime(a));
    list.slice(1).forEach((f) => { fs.unlinkSync(f); log(`Removed older copy ${path.relative(ROOT, f)}`); });
    let file = list[0];
    const tidy = path.join(path.dirname(file), name + path.extname(file).toLowerCase());
    if (file !== tidy) { fs.renameSync(file, tidy); file = tidy; }
    site[name] = file;
  }
  return site;
}

// Put each photo into images/ in place of the site photo with the same name
function swapIn(files, site, sayWhenSkipped) {
  const newest = {};
  files.filter((f) => EXT.test(f) && isFile(f)).forEach((f) => {
    const n = baseName(f);
    if (!newest[n] || mtime(f) > mtime(newest[n])) newest[n] = f;
  });
  for (const file of Object.values(newest)) {
    const name = baseName(file);
    const old = site[name];
    if (!old) { if (sayWhenSkipped) log(`Skipped ${path.basename(file)}: no site photo has that name`); continue; }
    if (hash(old) === hash(file)) continue; // already on the site
    const dest = path.join(path.dirname(old), name + path.extname(file).toLowerCase());
    fs.unlinkSync(old);
    fs.copyFileSync(file, dest);
    site[name] = dest;
    log(`Replaced ${path.relative(ROOT, old)} with ${path.relative(ROOT, file)}`);
  }
}

// Photos in images/ that are new or changed since the last build
function changedPhotos(site) {
  let manifest = {};
  try { manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8')); } catch {}
  return Object.entries(site).filter(([name, file]) => manifest[name] !== hash(file)).map(([name]) => name);
}

function handlePhotos(pasted) {
  const site = sitePhotos();
  const dropped = fs.readdirSync(DROP).map((f) => path.join(DROP, f));
  swapIn(dropped, site, true);
  swapIn(pasted, site, false);
  const changed = changedPhotos(site);
  if (!changed.length) return;
  try {
    run('node', [path.join('src', 'build.js')]);
    run('git', ['add', '--', 'images', 'public']);
    run('git', ['commit', '-m', `New photos: ${changed.join(', ')}\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`, '--', 'images', 'public']);
    run('git', ['push', 'origin', 'main']);
    log(`Built and pushed: ${changed.join(', ')}`);
  } catch (e) {
    log(`Problem, nothing pushed: ${(e.stderr || e.message).trim()}`);
  }
}

// Run once now, then again a few seconds after a photo changes anywhere in the project.
// Photos in other folders are only used when they are pasted or saved while this is running.
fs.mkdirSync(DROP, { recursive: true });
let pasted = new Set();
let timer = null;
let busy = false;
const schedule = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    if (busy) return schedule();
    busy = true;
    const files = [...pasted];
    pasted = new Set();
    try { handlePhotos(files); } catch (e) { log(`Problem: ${e.message}`); }
    busy = false;
  }, WAIT);
};
fs.watch(ROOT, { recursive: true }, (event, name) => {
  if (!name || !EXT.test(name) || IGNORE.includes(name.split(/[\\/]/)[0])) return;
  const file = path.join(ROOT, name);
  if (!inside(DROP, file) && !inside(IMAGES, file)) pasted.add(file);
  schedule();
});
console.log('Watching the project for replaced photos. Leave this window open.');
handlePhotos([]);
