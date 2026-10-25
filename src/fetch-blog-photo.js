// Fetches the one photo each blog post gets, from Pexels: node src/fetch-blog-photo.js
//
// For every post in src/content/blog/ whose `img:` photo is not yet in images/blog/, this
// searches Pexels for the post's `photo:` phrase (or its title when there is none), saves the
// first wide result as images/blog/<img>.jpg and records the photographer in image-credits.json.
// The normal build then converts it to WebP like any other photo.
//
// It needs PEXELS_API_KEY in the environment. The GitHub Action gets it from the repository
// secret of the same name; without it the script only lists what it would fetch and exits 0,
// so a build never fails over a missing key. A post never gets a second photo from here: to
// change one, delete images/blog/<img>.* (or drop in your own file with that name) and push.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const POSTS = path.join(ROOT, 'src', 'content', 'blog');
const PHOTOS = path.join(ROOT, 'images', 'blog');
const CREDITS = path.join(ROOT, 'image-credits.json');
const EXT = /\.(jpe?g|png|webp)$/i;
const KEY = process.env.PEXELS_API_KEY;

// Front matter, read the same way the build reads it (src/content/blog.js)
function frontMatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const meta = {};
  if (!m) return meta;
  m[1].split(/\r?\n/).forEach((line) => {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!kv) return;
    let v = kv[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    meta[kv[1]] = v;
  });
  return meta;
}

function readCredits() {
  try { return JSON.parse(fs.readFileSync(CREDITS, 'utf8')); } catch { return []; }
}

// Posts that still need a photo: have an img name, and no file by that name in images/blog/
function missing() {
  if (!fs.existsSync(POSTS)) return [];
  fs.mkdirSync(PHOTOS, { recursive: true });
  const have = new Set(fs.readdirSync(PHOTOS).filter((f) => EXT.test(f)).map((f) => f.replace(EXT, '')));
  return fs.readdirSync(POSTS).filter((f) => f.endsWith('.md')).sort().flatMap((f) => {
    const meta = frontMatter(fs.readFileSync(path.join(POSTS, f), 'utf8'));
    const img = meta.img || '';
    if (!img || img === 'blog-placeholder' || have.has(img)) return [];
    return [{ file: f, img, query: meta.photo || meta.title || f.replace(/\.md$/, '').replace(/-/g, ' ') }];
  });
}

async function search(query, page = 1) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&size=large&per_page=20&page=${page}`;
  const res = await fetch(url, { headers: { Authorization: KEY } });
  if (!res.ok) throw new Error(`Pexels search failed (${res.status}) for "${query}": ${(await res.text()).slice(0, 200)}`);
  return (await res.json()).photos || [];
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

async function main() {
  const todo = missing();
  if (!todo.length) { console.log('Blog photos: every post has its photo.'); return; }
  if (!KEY) {
    console.log(`Blog photos: PEXELS_API_KEY is not set, so ${todo.length} post(s) keep the placeholder for now: ${todo.map((t) => t.img).join(', ')}`);
    return;
  }
  const credits = readCredits();
  const used = new Set(credits.map((c) => c.url));
  for (const { file, img, query } of todo) {
    // First wide photo not already used elsewhere on the site, at least 1200px across
    let pick = null;
    for (let page = 1; page <= 3 && !pick; page++) {
      const photos = await search(query, page);
      pick = photos.find((p) => p.width >= 1200 && p.width > p.height && !used.has(p.url));
      if (photos.length < 20) break;
    }
    if (!pick) { console.warn(`Blog photos: nothing on Pexels for "${query}" (${file}); keeping the placeholder.`); continue; }
    const dest = path.join(PHOTOS, `${img}.jpg`);
    await download(pick.src.large2x || pick.src.original, dest);
    used.add(pick.url);
    credits.push({ file: `${img}.webp`, photographer: pick.photographer, url: pick.url });
    console.log(`Blog photos: ${img}.jpg from Pexels (${pick.photographer}) for "${query}"`);
  }
  fs.writeFileSync(CREDITS, JSON.stringify(credits, null, 2) + '\n');
}

main().catch((e) => { console.error(e.message); process.exit(1); });
