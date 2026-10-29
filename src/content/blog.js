// Blog posts live as Markdown files in src/content/blog/<slug>.md
//
// Each file starts with a front-matter block, then the post body in Markdown:
//
//   ---
//   title: Why your shower grout turns gray again a year after you clean it
//   date: 2026-10-20
//   category: Bath                     (Bath or Kitchen; "Kitchen, Bath" for a post about both. Drives the
//                                       label on the blog index card and the Bath / Kitchen filter buttons)
//   excerpt: One or two sentences shown on the blog index card.
//   description: Meta description for search engines, under 155 characters.
//   seoTitle: Optional shorter title for search results when the title runs past about 60 characters
//   summary: Two or three plain sentences that answer the post's question, shown as "Key takeaways", one bullet per sentence,
//            at the top of the post (search engines and AI answers quote this kind of passage).
//   img: blog-shower-grout-gray         (photo name in images/blog/, no extension; optional)
//   photo: gray grout tiled shower      (Pexels search phrase; src/fetch-blog-photo.js fetches the
//                                        post's one photo with it when images/blog/ has none)
//   photoCredit: Jane Doe on Pexels, https://www.pexels.com/photo/...   (written by that script)
//   ---
//   Body in Markdown...
//
// A post is live as soon as it is on main: merging its pull request publishes it, and the
// Action then sets its date to the day it went live (src/publish-posts.js). There is no draft
// switch; an old `draft:` line is ignored. On a branch or a Vercel preview (PREVIEW_BUILD=1 or
// VERCEL_ENV=preview) every post carries a "not on the live site yet" note. Newest first.
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'blog');
const PREVIEW = process.env.PREVIEW_BUILD === '1' || process.env.VERCEL_ENV === 'preview';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------- Front matter ----------
function parseFrontMatter(text, file) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing front matter block (--- ... ---) at the top`);
  const meta = {};
  m[1].split(/\r?\n/).forEach((line) => {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!kv) return;
    let v = kv[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    meta[kv[1]] = v;
  });
  return { meta, body: m[2] };
}

// ---------- Markdown (the small subset posts use) ----------
function inline(s) {
  return esc(s)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => inlineImage(src, alt))
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}
// ![alt](blog-photo-name) uses a site photo from images/blog/; ![alt](/assets/...) or a full URL is used as is
let imgUrl = (name) => `/assets/img/blog/${name}.webp`;
function inlineImage(src, alt) {
  const url = /^(\/|https?:)/.test(src) ? src : imgUrl(src);
  return `<img src="${url}" alt="${alt}" loading="lazy" decoding="async">`;
}

function table(lines) {
  const cells = (l) => l.replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => inline(c.trim()));
  const head = cells(lines[0]);
  const rows = lines.slice(2).map(cells);
  return `<div class="table-wrap"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${
    rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function markdown(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    let m;
    if ((m = line.match(/^(#{1,4})\s+(.*)$/))) {
      const level = Math.max(m[1].length, 2); // the page title is the H1, so a lone "# " in a post is still an H2
      out.push(`<h${level}>${inline(m[2])}</h${level}>`); i++; continue;
    }
    if (/^(-{3,}|\*{3,})$/.test(line.trim())) { out.push('<hr>'); i++; continue; }
    if (/^\|/.test(line) && /^\|?\s*:?-{2,}/.test(lines[i + 1] || '')) {
      const block = [];
      while (i < lines.length && /^\|/.test(lines[i])) block.push(lines[i++]);
      out.push(table(block)); continue;
    }
    if (/^>\s?/.test(line)) {
      const block = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) block.push(lines[i++].replace(/^>\s?/, ''));
      out.push(`<blockquote>${markdown(block.join('\n'))}</blockquote>`); continue;
    }
    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line)) {
      const ordered = /^\s*\d+[.)]\s+/.test(line);
      const re = ordered ? /^\s*\d+[.)]\s+/ : /^\s*[-*]\s+/;
      const items = [];
      while (i < lines.length && re.test(lines[i])) {
        let item = lines[i++].replace(re, '');
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !re.test(lines[i])) item += ' ' + lines[i++].trim();
        items.push(`<li>${inline(item)}</li>`);
      }
      out.push(ordered ? `<ol>${items.join('')}</ol>` : `<ul>${items.join('')}</ul>`); continue;
    }
    if (/^!\[[^\]]*\]\([^)]+\)\s*$/.test(line.trim())) { out.push(`<figure>${inline(line.trim())}</figure>`); i++; continue; }
    // Paragraph: consecutive non-empty lines that aren't another block
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|>|\||\s*[-*]\s|\s*\d+[.)]\s|-{3,}$)/.test(lines[i])) para.push(lines[i++].trim());
    out.push(`<p>${inline(para.join(' '))}</p>`);
  }
  return out.join('\n');
}

// ---------- Load ----------
function loadPosts() {
  if (!fs.existsSync(DIR)) return [];
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md')).sort();
  const all = files.map((f) => {
    const file = path.join(DIR, f);
    const { meta, body } = parseFrontMatter(fs.readFileSync(file, 'utf8'), path.relative(process.cwd(), file));
    const slug = f.replace(/\.md$/, '');
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) throw new Error(`${f}: file name must be lowercase words joined by hyphens (it becomes the web address)`);
    if (!meta.title) throw new Error(`${f}: front matter needs a title:`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date || '')) throw new Error(`${f}: front matter needs date: YYYY-MM-DD`);
    const d = new Date(meta.date + 'T12:00:00');
    const words = body.split(/\s+/).filter(Boolean).length;
    // Each H2 gets an id so search results and links can point at a section
    const toc = [];
    const html = markdown(body).replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
      const text = inner.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
      let id = text.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60).replace(/-$/, '') || 'section';
      while (toc.some((t) => t.id === id)) id += '-2';
      toc.push({ id, text: inner });
      return `<h2 id="${id}">${inner}</h2>`;
    });
    return {
      slug, title: meta.title, preview: PREVIEW, sortKey: meta.date, isoDate: meta.date,
      date: d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      excerpt: meta.excerpt || '',
      description: meta.description || meta.excerpt || '',
      summary: meta.summary || '', seoTitle: meta.seoTitle || '',
      img: meta.img || '',
      categories: (meta.category || 'Bath').split(',').map((c) => c.trim()).filter((c) => c === 'Bath' || c === 'Kitchen'),
      words, readMinutes: Math.max(1, Math.round(words / 225)), toc,
      body: html,
    };
  });
  return all.sort((a, b) => (a.sortKey < b.sortKey ? 1 : -1));
}

// build.js passes the real photo-URL helper in so inline images resolve to the right folder
function configure({ imgUrl: fn }) { if (fn) imgUrl = fn; }

module.exports = { loadPosts, configure, markdown };
