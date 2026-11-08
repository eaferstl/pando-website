#!/usr/bin/env node
/**
 * Builds docs/search-index.json from the headings in docs/*.html.
 *
 * There is no build step and no package manager, so nothing runs this for you.
 * Run it by hand after editing a docs page:
 *
 *   node scripts/build-search-index.mjs            # rewrite the index
 *   node scripts/build-search-index.mjs --check    # exit 1 if it is stale
 *
 * --check regenerates in memory and compares. That is the whole safety net for
 * a committed, generated file: without it a stale index fails silently, which
 * is worse than no search at all, because the reader is told an answer does
 * not exist.
 *
 * Heading ids come from the same slug rule used to write them into the markup:
 * lowercase, strip accents and apostrophes, drop a leading ordinal, collapse
 * everything else to single hyphens. The index reads the id that is actually in
 * the file rather than recomputing it, so a hand-edited id still resolves.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = join(ROOT, 'docs');
const OUT = join(DOCS, 'search-index.json');
const SNIPPET = 220;

const ENTITIES = {
  '&lt;': '<', '&gt;': '>', '&amp;': '&', '&quot;': '"', '&apos;': "'",
  '&nbsp;': ' ', '&copy;': '(c)', '&rarr;': '→', '&larr;': '←',
  '&ldquo;': '“', '&rdquo;': '”', '&lsquo;': '‘', '&rsquo;': '’',
  '&hellip;': '…', '&#10003;': '✓', '&#10007;': '✗', '&#39;': "'",
};

// Tags are stripped BEFORE entities are decoded. The reverse order turns a
// documented `&lt;namespace&gt;` placeholder into a tag and deletes it.
function toText(html) {
  let s = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  s = s.replace(/&[a-zA-Z]+;|&#\d+;/g, (m) => (m in ENTITIES ? ENTITIES[m] : ' '));
  return s.replace(/\s+/g, ' ').trim();
}

function clip(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sp = cut.lastIndexOf(' ');
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut).trimEnd() + '…';
}

function urlFor(file) {
  return file === 'index.html' ? '/docs/' : '/docs/' + file.replace(/\.html$/, '');
}

function build() {
  const files = readdirSync(DOCS).filter((f) => f.endsWith('.html')).sort();
  const pages = [];

  for (const file of files) {
    const src = readFileSync(join(DOCS, file), 'utf8');
    const main = /<main\b[^>]*class="[^"]*docs-content[^"]*"[^>]*>([\s\S]*?)<\/main>/i.exec(src);
    if (!main) throw new Error(`${file}: no <main class="docs-content"> found`);
    const body = main[1];

    const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(body);
    const title = h1 ? toText(h1[1]) : file;

    // Split on h2/h3 so each heading owns the text up to the next one.
    const re = /<(h[23])[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/gi;
    const marks = [];
    let m;
    while ((m = re.exec(body)) !== null) {
      marks.push({ tag: m[1].toLowerCase(), id: m[2], text: toText(m[3]), at: m.index, end: re.lastIndex });
    }

    const headings = marks.map((mk, i) => ({
      text: mk.text,
      slug: mk.id,
      depth: mk.tag === 'h2' ? 2 : 3,
      body: clip(toText(body.slice(mk.end, i + 1 < marks.length ? marks[i + 1].at : body.length)), SNIPPET),
    }));

    pages.push({ title, url: urlFor(file), headings });
  }
  return pages;
}

// Grouped by page rather than one flat record per heading: the page title and
// url would otherwise repeat 168 times for 14 distinct values. The search code
// flattens it on load.
const pages = build();
const json = JSON.stringify(pages, null, 1) + '\n';
const count = pages.reduce((n, p) => n + p.headings.length, 0);

if (process.argv.includes('--check')) {
  let current = null;
  try { current = readFileSync(OUT, 'utf8'); } catch { /* missing counts as stale */ }
  if (current === json) {
    console.log(`search index is current: ${pages.length} pages, ${count} headings`);
    process.exit(0);
  }
  console.error('search index is STALE. Run: node scripts/build-search-index.mjs');
  if (current !== null) {
    const a = JSON.parse(current), b = pages;
    const flat = (x) => new Map(x.flatMap((p) => p.headings.map((h) => [p.url + '#' + h.slug, h.text + '\u0000' + h.body])));
    const A = flat(a), B = flat(b);
    for (const k of B.keys()) if (!A.has(k)) console.error('  + ' + k);
    for (const k of A.keys()) if (!B.has(k)) console.error('  - ' + k);
    for (const k of B.keys()) if (A.has(k) && A.get(k) !== B.get(k)) console.error('  ~ ' + k);
  }
  process.exit(1);
}

writeFileSync(OUT, json);
console.log(`wrote ${OUT.replace(ROOT + '/', '')}: ${pages.length} pages, ${count} headings, ${json.length} bytes`);
