// Runs on main, before the build: node src/publish-posts.js
//
// Merging a post's pull request is what publishes it, so the day it lands on main is its
// publish date. Any post whose date: is still in the future (the planned date the writer
// penciled in) is set to today, and a leftover draft: line from the old workflow is removed.
// The Action commits the result together with the built site.
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'content', 'blog');
const today = new Date().toISOString().slice(0, 10);
let changed = 0;
for (const f of fs.readdirSync(DIR).filter((f) => f.endsWith('.md')).sort()) {
  const file = path.join(DIR, f);
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/^---\r?\n[\s\S]*?\r?\n---/);
  if (!m) continue;
  let head = m[0].replace(/^draft:.*\r?\n/m, '');
  const date = (head.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m) || [])[1];
  if (date && date > today) head = head.replace(/^date:.*$/m, `date: ${today}`);
  if (head !== m[0]) {
    fs.writeFileSync(file, head + text.slice(m[0].length));
    changed++;
    console.log(`Published: ${f}${date && date > today ? ` (date ${date} -> ${today})` : ''}`);
  }
}
if (!changed) console.log('Publish: nothing to stamp.');
