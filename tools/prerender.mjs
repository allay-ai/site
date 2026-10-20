// Runs after both Vite builds (see "build" in package.json). It renders every
// route from the SSR bundle in dist-ssr/ into the client's dist/index.html and
// writes the result where Cloudflare's asset handling looks for it:
//
//   /                 dist/index.html
//   /ru/              dist/ru/index.html
//   /wiki/plugin/faq/ dist/wiki/plugin/faq/index.html
//   anything else     dist/404.html   (served with a 404 status)
//
// It also writes dist/sitemap.xml from the same page list, and
// dist/wiki-version.json with the wiki commits the build used, which the
// scheduled workflow compares to decide whether the wiki moved.

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = `${root}dist/`
const bundle = `${root}dist-ssr/`

const { render, headTags, origin, pages, notFoundPage } = await import(
  new URL('../dist-ssr/entry-server.js', import.meta.url).href
)

const template = await readFile(`${dist}index.html`, 'utf8')
for (const marker of ['<!--route-head-->', '<div id="root"></div>', '<html lang="en">']) {
  if (!template.includes(marker)) {
    throw new Error(`dist/index.html has no ${marker}`)
  }
}

async function write(page, renderPath, file) {
  const body = await render(renderPath)
  const html = template
    .replace('<html lang="en">', `<html lang="${page.lang}">`)
    .replace('<!--route-head-->', headTags(page))
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  const target = `${dist}${file}`
  await mkdir(target.slice(0, target.lastIndexOf('/')), { recursive: true })
  await writeFile(target, html)
}

for (const page of pages) {
  await write(page, page.path, `${page.path.slice(1)}index.html`)
}
// Any path the router does not know renders the catch-all route.
await write(notFoundPage, '/this-page-does-not-exist/', '404.html')
console.log(`prerendered ${pages.length} pages and 404.html`)

// The sitemap comes from the same list, so a new page cannot be missing from
// it. No <lastmod>: nothing here knows honestly when a page last changed.
const urls = pages
  .filter((page) => !page.noindex)
  .map((page) => `  <url><loc>${origin}${page.path}</loc></url>`)
await writeFile(
  `${dist}sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`,
)
console.log(`wrote dist/sitemap.xml with ${urls.length} pages`)

const wiki = JSON.parse(await readFile(`${root}src/generated/wiki/index.json`, 'utf8'))
const version = Object.fromEntries(wiki.books.map((book) => [book.repo, book.sha]))
await writeFile(`${dist}wiki-version.json`, `${JSON.stringify(version, null, 2)}\n`)

await rm(bundle, { recursive: true, force: true })
