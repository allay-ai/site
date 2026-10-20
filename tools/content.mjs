// Fetches what the site shows but doesn't own, and turns it into data the React
// build imports. Runs first in `pnpm build`:
//
//   1. The two GitHub wikis, cloned shallow into .content/<book>/: allay-ai/server's
//      becomes /wiki/, allay-ai/minecraft's /wiki/plugin/. Each page is rendered
//      from Markdown to HTML here, at build time, so the browser gets no Markdown
//      parser and no wiki fetch of its own.
//   2. The compose files the front page shows, from the wikis' install pages,
//      and the newest release of the plugin and the backend.
//
// Writes src/generated/wiki/index.json (books, sidebars, page list),
// src/generated/wiki/pages/<book>--<slug>.json (one page each, loaded on demand),
// src/generated/snippets.json, and src/generated/releases.json. Everything in src/generated/ is git-ignored.
//
// Flags:
//   --if-missing  do nothing when src/generated/ already exists (`pnpm dev`)
//   --offline     use .content/ as it is, without fetching
//
// WIKI_SERVER_DIR and WIKI_PLUGIN_DIR point a book at a local clone instead, to
// preview a wiki change before pushing it.

import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import GithubSlugger from 'github-slugger'
import { Marked, Renderer } from 'marked'
import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/index.js'

const root = fileURLToPath(new URL('..', import.meta.url))
const cacheDir = `${root}.content/`
const outDir = `${root}src/generated/`
const args = new Set(process.argv.slice(2))

/** The books, in the order the wiki's sidebar shows them. */
const books = [
  {
    id: 'server',
    repo: 'allay-ai/server',
    title: 'Allay Server',
    blurb: 'The backend: hosting, settings, billing, memory, the HTTP API.',
    base: '/wiki/',
    localEnv: 'WIKI_SERVER_DIR',
  },
  {
    id: 'plugin',
    repo: 'allay-ai/minecraft',
    title: 'Allay plugin',
    blurb: 'The Minecraft plugin: installing, asking, commands, configuration.',
    base: '/wiki/plugin/',
    localEnv: 'WIKI_PLUGIN_DIR',
  },
]

if (args.has('--if-missing') && existsSync(`${outDir}wiki/index.json`)) {
  process.exit(0)
}

loadLanguages(['bash', 'yaml', 'json', 'typescript', 'kotlin', 'ini', 'properties'])
const languageAliases = {
  shell: 'bash',
  sh: 'bash',
  console: 'bash',
  zsh: 'bash',
  yml: 'yaml',
  ts: 'typescript',
  kt: 'kotlin',
}

function git(args, cwd) {
  return execFileSync('git', args, { cwd, stdio: ['ignore', 'pipe', 'pipe'] })
    .toString()
    .trim()
}

/** Clones or updates a book's wiki and returns its folder and commit. */
function fetchBook(book) {
  const local = process.env[book.localEnv]
  if (local) {
    console.log(`wiki ${book.id}: using ${local}`)
    return {
      dir: local.endsWith('/') ? local : `${local}/`,
      sha: git(['rev-parse', 'HEAD'], local),
    }
  }
  const dir = `${cacheDir}${book.id}/`
  const url = `https://github.com/${book.repo}.wiki.git`
  if (!args.has('--offline')) {
    try {
      if (existsSync(`${dir}.git`)) {
        git(['fetch', '--depth', '1', 'origin', 'HEAD'], dir)
        git(['reset', '--hard', 'FETCH_HEAD'], dir)
      } else {
        execFileSync('git', ['clone', '--depth', '1', url, dir], { stdio: 'pipe' })
      }
    } catch (error) {
      // An old copy beats no build, but only when there is one.
      if (!existsSync(`${dir}.git`)) throw error
      console.warn(
        `wiki ${book.id}: fetch failed, building from the cached copy (${error.message.split('\n')[0]})`,
      )
    }
  }
  if (!existsSync(`${dir}.git`)) {
    throw new Error(`wiki ${book.id}: no copy in ${dir}; run without --offline once`)
  }
  return { dir, sha: git(['rev-parse', 'HEAD'], dir) }
}

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** A wiki page's file name as a URL segment: Self-hosting-with-Docker -> self-hosting-with-docker. */
const slugOf = (name) => name.toLowerCase()

function pathOf(book, name) {
  return name.toLowerCase() === 'home' ? book.base : `${book.base}${slugOf(name)}/`
}

/** Plain text of inline Markdown, for titles and descriptions. */
function plain(markdown) {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function describe(markdown) {
  const paragraph = markdown
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block && !/^(#|```|\||[-*] |\d+\. |>)/.test(block))
  const text = plain(paragraph ?? '')
  if (text.length <= 158) return text
  const cut = text.slice(0, 155)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

/** `**[Home](Home)**`, `**Group**`, and `- [Title](Page)` lines, as GitHub draws them. */
function parseSidebar(markdown) {
  const groups = []
  let current = null
  for (const line of markdown.split('\n')) {
    const item = line.match(/^\s*[-*]\s+\[([^\]]+)\]\(([^)]+)\)/)
    const heading = line.match(/^\s*\*\*(.+?)\*\*\s*$/)
    if (item) {
      if (!current) {
        current = { title: null, items: [] }
        groups.push(current)
      }
      current.items.push({ title: item[1], target: item[2] })
    } else if (heading) {
      const link = heading[1].match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (link) {
        groups.push({ title: null, items: [{ title: link[1], target: link[2] }] })
        current = null
      } else {
        current = { title: heading[1], items: [] }
        groups.push(current)
      }
    }
  }
  return groups.filter((group) => group.items.length)
}

const githubWiki = /^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)\/wiki\/?([^#?]*)(#.*)?$/

/**
 * Where a link in a wiki page goes on this site. Links between pages of either
 * book stay on the site; a page that doesn't exist falls back to GitHub, and
 * anything that isn't http(s), mailto, or a fragment is dropped.
 */
function resolveLink(href, book, pagesByBook, problems, from) {
  if (href.startsWith('#')) return href
  const wiki = href.match(githubWiki)
  if (wiki) {
    const target = books.find((b) => b.repo.toLowerCase() === wiki[1].toLowerCase())
    if (target) return internal(target, decodeURIComponent(wiki[2]) || 'Home', wiki[3] ?? '')
    return href
  }
  if (/^(https?:|mailto:)/i.test(href)) return href
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//')) {
    problems.push(`${from}: dropped link ${href}`)
    return null
  }
  const [name, hash] = href.split('#')
  return internal(book, decodeURIComponent(name) || 'Home', hash ? `#${hash}` : '')

  function internal(target, name, hash) {
    const page = pagesByBook.get(target.id).get(name.toLowerCase())
    if (!page) {
      problems.push(`${from}: no page ${target.id}/${name}, linked to GitHub`)
      return `https://github.com/${target.repo}/wiki/${encodeURIComponent(name)}${hash}`
    }
    if (hash) page.wantedAnchors.push({ anchor: hash.slice(1), from })
    return `${page.path}${hash}`
  }
}

function renderMarkdown(markdown, book, pagesByBook, problems, from) {
  const slugger = new GithubSlugger()
  const toc = []
  const anchors = new Set()
  const renderer = new Renderer()

  renderer.heading = function ({ tokens, depth, text }) {
    const id = slugger.slug(plain(text))
    anchors.add(id)
    const inner = this.parser.parseInline(tokens)
    if (depth === 2) toc.push({ id, text: plain(text) })
    const level = Math.min(depth, 6)
    return `<h${level} id="${id}"><a class="anchor" href="#${id}" aria-label="Link to this section">#</a>${inner}</h${level}>\n`
  }
  renderer.link = function ({ href, title, tokens }) {
    const inner = this.parser.parseInline(tokens)
    const target = resolveLink(href, book, pagesByBook, problems, from)
    if (!target) return inner
    const external = /^https?:/i.test(target)
    const titleAttr = title ? ` title="${escapeHtml(title)}"` : ''
    const rel = external ? ' rel="noopener"' : ''
    return `<a href="${escapeHtml(target)}"${titleAttr}${rel}>${inner}</a>`
  }
  renderer.image = ({ href, title, text }) => {
    // Pictures in a wiki live next to its pages; GitHub serves them raw.
    const src = /^https:\/\//i.test(href)
      ? href
      : `https://raw.githubusercontent.com/wiki/${book.repo}/${href.replace(/^\.?\//, '')}`
    const titleAttr = title ? ` title="${escapeHtml(title)}"` : ''
    return `<img src="${escapeHtml(src)}" alt="${escapeHtml(text)}"${titleAttr} loading="lazy" />`
  }
  // Anyone allowed to edit a wiki could otherwise put a script on allay.chat,
  // the same origin as the admin panel. Raw HTML shows as text instead.
  renderer.html = ({ text }) => escapeHtml(text)
  renderer.code = ({ text, lang }) => {
    const name = (lang ?? '').trim().split(/\s+/)[0].toLowerCase()
    const language = languageAliases[name] ?? name
    const grammar = Prism.languages[language]
    const body = grammar ? Prism.highlight(text, grammar, language) : escapeHtml(text)
    const cls = grammar ? ` class="language-${language}"` : ''
    return `<pre${cls}><code${cls}>${body}</code></pre>\n`
  }
  renderer.table = function (token) {
    // Wide tables scroll inside their own box, so a phone never scrolls the page sideways.
    return `<div class="table-scroll" tabindex="0">${Renderer.prototype.table.call(this, token)}</div>\n`
  }

  const marked = new Marked({ gfm: true, renderer })
  const html = marked.parse(markdown, { async: false })
  return { html, toc, anchors }
}

async function readBook(book) {
  const { dir, sha } = fetchBook(book)
  const files = (await readdir(dir)).filter((file) => file.endsWith('.md'))
  const read = async (file) => (await readFile(`${dir}${file}`, 'utf8')).replace(/\r\n/g, '\n')
  const sidebar = files.includes('_Sidebar.md') ? parseSidebar(await read('_Sidebar.md')) : []
  const titles = new Map(
    sidebar.flatMap((group) => group.items).map((item) => [item.target.toLowerCase(), item.title]),
  )
  const pages = []
  for (const file of files) {
    if (file.startsWith('_')) continue
    const name = file.slice(0, -3)
    let markdown = await read(file)
    // Some wikis open each page with its own title; the site prints the title itself.
    const h1 = markdown.match(/^\s*#\s+(.+)\n/)
    if (h1) markdown = markdown.slice(h1[0].length)
    const title =
      name.toLowerCase() === 'home'
        ? book.title
        : (titles.get(name.toLowerCase()) ?? (h1 ? plain(h1[1]) : name.replace(/-/g, ' ')))
    pages.push({
      name,
      title,
      markdown,
      path: pathOf(book, name),
      slug: slugOf(name),
      wantedAnchors: [],
    })
  }
  const footer = files.includes('_Footer.md') ? await read('_Footer.md') : ''
  return { book, sha, sidebar, pages, footer }
}

const read = await Promise.all(books.map(readBook))
const pagesByBook = new Map(
  read.map(({ book, pages }) => [
    book.id,
    new Map(pages.map((page) => [page.name.toLowerCase(), page])),
  ]),
)

// Two books share /wiki/, so a server page may not take the plugin book's name.
const pluginSegment = 'plugin'
if (pagesByBook.get('server').has(pluginSegment)) {
  throw new Error(
    `The server wiki has a page named “${pluginSegment}”, which /wiki/plugin/ already uses`,
  )
}

const problems = []
await rm(`${outDir}wiki`, { recursive: true, force: true })
await mkdir(`${outDir}wiki/pages`, { recursive: true })

const index = { books: [] }
for (const { book, sha, sidebar, pages, footer } of read) {
  for (const page of pages) {
    const from = `${book.id}/${page.name}`
    const { html, toc, anchors } = renderMarkdown(page.markdown, book, pagesByBook, problems, from)
    page.anchors = anchors
    const data = {
      book: book.id,
      path: page.path,
      title: page.title,
      description: describe(page.markdown),
      html,
      toc,
    }
    page.description = data.description
    const file = `${book.id}--${page.slug}.json`
    page.file = file
    await writeFile(`${outDir}wiki/pages/${file}`, JSON.stringify(data))
  }
  const footerHtml = footer
    ? renderMarkdown(footer, book, pagesByBook, problems, `${book.id}/_Footer`).html
    : ''
  const resolveItem = (item) => {
    const target = resolveLink(item.target, book, pagesByBook, problems, `${book.id}/_Sidebar`)
    return { title: item.title, path: target }
  }
  index.books.push({
    id: book.id,
    title: book.title,
    blurb: book.blurb,
    repo: book.repo,
    base: book.base,
    sha,
    editUrl: `https://github.com/${book.repo}/wiki`,
    footerHtml,
    sidebar: sidebar.map((group) => ({ title: group.title, items: group.items.map(resolveItem) })),
    pages: pages
      .map((page) => ({
        name: page.name,
        path: page.path,
        title: page.title,
        description: page.description,
        file: page.file,
      }))
      .sort((a, b) => a.path.localeCompare(b.path)),
  })
}

for (const pages of pagesByBook.values()) {
  for (const page of pages.values()) {
    for (const { anchor, from } of page.wantedAnchors) {
      if (!page.anchors.has(anchor)) problems.push(`${from}: ${page.name} has no #${anchor}`)
    }
  }
}

await writeFile(`${outDir}wiki/index.json`, `${JSON.stringify(index, null, 2)}\n`)
const count = index.books.reduce((sum, book) => sum + book.pages.length, 0)
console.log(
  `wiki: rendered ${count} pages from ${index.books.map((b) => `${b.repo}@${b.sha.slice(0, 7)}`).join(', ')}`,
)
for (const problem of problems) console.warn(`wiki: ${problem}`)

// The compose files the front page shows, taken from the wikis so they change
// when the manual does: a new backend version, a new required variable.
function firstYaml(bookId, pageName) {
  const page = read
    .find(({ book }) => book.id === bookId)
    .pages.find((candidate) => candidate.name === pageName)
  const block = page?.markdown.match(/```ya?ml\n([\s\S]*?)\n\s*```/)
  if (!block) throw new Error(`wiki ${bookId}/${pageName} has no yaml block for the front page`)
  // A block inside a list item is indented with it; take the indent off.
  const lines = block[1].split('\n')
  const indent = Math.min(
    ...lines.filter((line) => line.trim()).map((line) => line.match(/^ */)[0].length),
  )
  return lines.map((line) => line.slice(indent)).join('\n')
}
const snippets = {
  selfHostCompose: firstYaml('server', 'Self-hosting-with-Docker'),
  pluginCompose: firstYaml('plugin', 'Installation'),
}
await writeFile(`${outDir}snippets.json`, `${JSON.stringify(snippets, null, 2)}\n`)

// The newest releases, for the version next to the download button. A failed lookup keeps
// what the last build found, and without that the page links to the release
// list instead of naming a version.
async function latest(repo) {
  if (args.has('--offline')) return null
  try {
    const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'allay-site-build' }
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers,
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const { tag_name: tag } = await response.json()
    return typeof tag === 'string' ? tag.replace(/^v/, '') : null
  } catch (error) {
    console.warn(`releases: ${repo} lookup failed (${error.message})`)
    return null
  }
}

const releasesFile = `${outDir}releases.json`
const previous = existsSync(releasesFile) ? JSON.parse(await readFile(releasesFile, 'utf8')) : {}
const releases = {
  plugin: (await latest('allay-ai/minecraft')) ?? previous.plugin ?? null,
  server: (await latest('allay-ai/server')) ?? previous.server ?? null,
}
await writeFile(releasesFile, `${JSON.stringify(releases, null, 2)}\n`)
console.log(
  `releases: plugin ${releases.plugin ?? 'unknown'}, server ${releases.server ?? 'unknown'}`,
)
