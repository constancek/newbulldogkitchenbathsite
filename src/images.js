// Site photos: the images/ folder holds every photo, sorted into subfolders by page.
// Replace a file there (same name, as .jpg, .png or .webp) and run the build: changed photos are
// converted to WebP into public/assets/img. images/.converted.json remembers what is already converted.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'images');
const DEST = path.join(ROOT, 'public', 'assets', 'img');
const MANIFEST = path.join(SRC, '.converted.json');
const EXT = /\.(jpe?g|png|webp)$/i;

// Which subfolder of images/ each photo lives in, by the start of its name
const FOLDERS = [
  ['steps-', 'process-steps'],
  ['promos-', 'promos'],
  ['home-', 'home'], ['difference-', 'home'],
  ['about-', 'about'], ['contact-', 'about'],
  ['blog-', 'blog'],
  ['design-spotlight', 'inspiration'], ['shop-the-', 'inspiration'],
  ['faqs-', 'other-pages'], ['financing-', 'other-pages'], ['warranty-', 'other-pages'],
  ['products-', 'bathrooms/overview'],
  ['showers-', 'bathrooms/showers'],
  ['tub-to-', 'bathrooms/tub-to-shower-conversions'],
  ['bathtubs-', 'bathrooms/bathtubs'],
  ['walk-in-', 'bathrooms/walk-in-tubs'],
  ['accessibility-', 'bathrooms/accessibility'],
  ['shower-enclosures-', 'bathrooms/shower-enclosures'],
  ['vanities-', 'bathrooms/vanities'],
  ['bath-accessories-', 'bathrooms/accessories'],
  ['colors-patterns-', 'bathrooms/colors-patterns'],
  ['kitchens-', 'kitchens/overview'],
  ['kitchen-cabinets-', 'kitchens/cabinets'],
  ['countertops-', 'kitchens/countertops'],
  ['backsplash-', 'kitchens/backsplash'],
  ['sinks-faucets-', 'kitchens/sinks-faucets'],
  ['kitchen-organizers-', 'kitchens/organizers-accessories'],
  ['option-', 'shared-options'],
];
const folderFor = (name) => (FOLDERS.find(([start]) => name.startsWith(start)) || [, 'other'])[1];

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.name.startsWith('.') ? [] : e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const hash = (file) => crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex');
const readManifest = () => { try { return JSON.parse(fs.readFileSync(MANIFEST, 'utf8')); } catch { return {}; } };
const writeManifest = (m) => fs.writeFileSync(MANIFEST, JSON.stringify(Object.fromEntries(Object.entries(m).sort()), null, 2) + '\n');

// First run: copy every site photo into images/, sorted by page
function seed() {
  const manifest = {};
  fs.readdirSync(DEST).filter((f) => f.endsWith('.webp')).forEach((f) => {
    const name = f.replace(/\.webp$/, '');
    const dir = path.join(SRC, folderFor(name));
    fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(path.join(DEST, f), path.join(dir, f));
    manifest[name] = hash(path.join(dir, f));
  });
  writeManifest(manifest);
  console.log(`Copied ${Object.keys(manifest).length} photos into images/`);
}

// Convert any new or replaced photo in images/ to public/assets/img/<name>.webp
function syncImages() {
  if (!fs.existsSync(SRC)) return seed();
  const files = walk(SRC).filter((f) => EXT.test(f));
  const byName = {};
  files.forEach((f) => (byName[path.basename(f).replace(EXT, '')] ||= []).push(f));
  const dupes = Object.entries(byName).filter(([, list]) => list.length > 1);
  if (dupes.length) {
    throw new Error('Two photos share a name in images/, delete the old one:\n' +
      dupes.map(([, list]) => list.map((f) => '  ' + path.relative(ROOT, f)).join('\n')).join('\n'));
  }
  const manifest = readManifest();
  const changed = [];
  for (const [name, [file]] of Object.entries(byName)) {
    const h = hash(file);
    const out = path.join(DEST, name + '.webp');
    if (manifest[name] === h && fs.existsSync(out)) continue;
    try {
      execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', file, '-vf', "scale='min(2000,iw)':-2", '-c:v', 'libwebp', '-quality', '85', out]);
    } catch (e) {
      throw new Error(`Could not convert ${path.relative(ROOT, file)}. Is ffmpeg installed?\n${e.message}`);
    }
    manifest[name] = h;
    changed.push(name);
  }
  writeManifest(manifest);
  if (changed.length) console.log(`Updated ${changed.length} photo(s): ${changed.join(', ')}`);
}

module.exports = { syncImages };
