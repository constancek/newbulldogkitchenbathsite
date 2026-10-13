// Photo drop folder: watches "replace donot push/" and, when a photo appears there named like a site photo
// (for example showers-card.jpg), swaps it into images/, rebuilds the site and pushes to GitHub.
// Start with: npm run watch-photos  (leave the window open). What happened is written to replace-log.txt in that folder.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const DROP = path.join(ROOT, 'replace donot push');
const IMAGES = path.join(ROOT, 'images');
const LOG = path.join(DROP, 'replace-log.txt');
const EXT = /\.(jpe?g|png|webp)$/i;
const WAIT = 5000; // let files finish copying before using them

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.name.startsWith('.') ? [] : e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const hash = (file) => crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex');
const baseName = (file) => path.basename(file).replace(EXT, '').toLowerCase();
const run = (cmd, args) => execFileSync(cmd, args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

function log(msg) {
  const line = `${new Date().toLocaleString()}  ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG, line + '\n');
}

function processDrop() {
  const site = {};
  walk(IMAGES).filter((f) => EXT.test(f)).forEach((f) => (site[baseName(f)] = f));
  // If a name is in the folder twice (showers-card.jpg and showers-card.webp), only the newest file counts
  const newest = {};
  fs.readdirSync(DROP).map((f) => path.join(DROP, f)).filter((f) => EXT.test(f) && fs.statSync(f).isFile()).forEach((f) => {
    const n = baseName(f);
    if (!newest[n] || fs.statSync(f).mtimeMs > fs.statSync(newest[n]).mtimeMs) newest[n] = f;
  });
  const replaced = [];
  for (const file of Object.values(newest)) {
    const old = site[baseName(file)];
    if (!old) { log(`Skipped ${path.basename(file)}: no site photo has that name`); continue; }
    if (hash(old) === hash(file)) continue; // already on the site
    const dest = path.join(path.dirname(old), path.basename(file));
    fs.unlinkSync(old);
    fs.copyFileSync(file, dest);
    replaced.push(path.basename(file));
    log(`Replaced ${path.relative(ROOT, old)} with ${path.basename(file)}`);
  }
  if (!replaced.length) return;
  try {
    run('node', [path.join('src', 'build.js')]);
    run('git', ['add', '--', 'images', 'public']);
    run('git', ['commit', '-m', `New photos: ${replaced.join(', ')}\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`, '--', 'images', 'public']);
    run('git', ['push', 'origin', 'main']);
    log(`Built and pushed: ${replaced.join(', ')}`);
  } catch (e) {
    log(`Problem, nothing pushed: ${(e.stderr || e.message).trim()}`);
  }
}

// Run once now, then again a few seconds after anything changes in the folder
fs.mkdirSync(DROP, { recursive: true });
let timer = null;
let busy = false;
const schedule = () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    if (busy) return schedule();
    busy = true;
    try { processDrop(); } catch (e) { log(`Problem: ${e.message}`); }
    busy = false;
  }, WAIT);
};
fs.watch(DROP, (event, name) => { if (name && EXT.test(name)) schedule(); });
console.log(`Watching "${path.relative(ROOT, DROP)}" for new photos. Leave this window open.`);
processDrop();
