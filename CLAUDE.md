# Allay Site: notes for AI agents

The source of allay.chat: the front page of Allay (the AI helper for Minecraft servers), the two wikis rendered under `/wiki/`, the privacy policy, the terms, and the Worker in front of it all. README.md is for people, README.RU.md its Russian copy; change both together.

## Talking to the owner

- Reply in Russian, address the owner as «вы». Quotes «ёлочки», nested „лапки“, an em dash with spaces « — ».
- Code, comments, and commit messages are in English. Commits are short imperative one-liners, one change each: “Render wiki tables in their own scroll box”.
- Text on the site follows the owner's typography. English: curly quotes “…”, apostrophes ’, an em dash without spaces. Russian: «ёлочки», « — », «вы» in lower case. Spanish: «comillas», “inglesas” inside them, «tú», numbers grouped only from five digits (2000, 10 000). Plain active sentences; no “seamless”, “robust”, “leverage”.

## How it fits together

| Path | What it does |
|---|---|
| `src/i18n/` | Every text of the front page and the header and footer: `en.tsx`, `ru.tsx`, `es.tsx`, the `Copy` type that keeps them complete, and `locales.ts` |
| `src/data/pages.ts` | Every route's head: title, description, canonical, hreflang, and the sitemap's list |
| `src/data/plans.ts` | Prices, budgets, BYOK limits, and retention: copies of the backend's defaults. Solo plans wait there unshown while `soloOnSale` is false, as the backend's `SOLO_PLANS` |
| `src/data/site.ts` | Every outside address, Allay's builds by platform (the Fabric and NeoForge mods once they ship), and the stores (Hangar; Modrinth once its review ends) |
| `src/components/home/` | The front page's sections; `ChatDemo` draws the game chat as the plugin does |
| `src/pages/` | The routes: `HomePage`, `WikiPage`, `PrivacyPage`, `TermsPage`, `NotFoundPage`, `ErrorPage` |
| `src/wiki/content.ts` | The rendered wiki: the index, and each page's HTML as its own chunk |
| `tools/content.mjs` | Fetches both wikis into `.content/`, renders them into `src/generated/`, takes the front page's compose files from the wikis, and asks GitHub for the newest releases |
| `tools/prerender.mjs` | Writes `dist/<path>/index.html` for every page, `404.html`, `sitemap.xml`, and `wiki-version.json` |
| `worker/index.ts` | Passes `/api/*`, `/admin`, `/admin/*` to `ORIGIN`, and serves `/download/allay-<platform>[-X.Y.Z].jar` from the GitHub release itself, since itzg's downloader refuses GitHub's redirect (itzg/mc-image-helper#913); tests in `worker/index.test.ts` |
| `public/_headers` | CSP, HSTS, and the other security headers of every static file |

## Rules that keep it working

- Use pnpm through Corepack, as `packageManager` pins it, and Biome for lint and format; never ESLint or Prettier. One `*.module.less` per component; global classes only in `src/styles/global.less`; colors only as the variables in `tokens.less`, defined for both themes in `global.less`.
- Every path ends in a slash. A new route goes into `src/routes.tsx` and `src/data/pages.ts`; without the second it gets no head, no prerendered file, and no sitemap entry.
- Never read `window`, storage, `Intl`, or the clock while rendering: the first render must match the prerendered HTML. Numbers go through `src/i18n/format.ts`, not `toLocaleString`.
- The CSP allows scripts, styles, and fonts from the site only: no inline `<script>`, no `style=` attribute, no `data:` font, no CDN. `public/theme.js` sets the theme before paint for that reason, and Vite never inlines fonts (`vite.config.ts`).
- The site stays cookie-free and without analytics. Anything that would change that, or keep data in the Worker (Workers Logs included), changes `src/pages/PrivacyPage.tsx` in the same piece of work, and needs the owner's yes.
- Never state a feature, number, price, or testimonial that the plugin's or the backend's README, wiki, or code doesn't back. Prices and limits live in `src/data/plans.ts`; when allay-ai/server changes `PLAN_*` or `BYOK_*` defaults, change them there.
- The `[[…]]` fields on the legal pages are the owner's identity. Never fill them with guesses; the owner writes them in.
- The legal pages describe what allay-ai/server keeps. When its retention, processors, or data change (its wiki's “Security and privacy” and “Memory and traces”), change the privacy policy too.

## The wiki

- The wikis are the source; never edit their text here. `tools/content.mjs` renders them: GitHub's anchors (github-slugger), links between pages and between the two books kept on the site, Prism for code, wide tables in a scroll box. Raw HTML in a wiki shows as text: allay.chat shares its origin with the admin panel, so a script from a wiki could act as a signed-in admin. Keep it that way.
- `/wiki/` is allay-ai/server's wiki and `/wiki/plugin/` allay-ai/minecraft's. A page's URL is its name in lower case: `Self-hosting-with-Docker` is `/wiki/self-hosting-with-docker/`. A server page named “Plugin” would collide, and the build refuses it.
- The build prints a warning for a link to a page or an anchor that doesn't exist. Read them after `pnpm build`; fix them in the wiki.
- To refresh: `pnpm content` locally; on the site, the “build” workflow checks every hour and deploys only when a wiki moved, or `gh workflow run build.yml -R allay-ai/site` at once. To preview a wiki change before pushing it, point `WIKI_SERVER_DIR` or `WIKI_PLUGIN_DIR` at a local clone.
- Wiki pushes start no workflow here. For an instant refresh, a workflow in allay-ai/server and allay-ai/minecraft can run on `gollum` and call `gh workflow run build.yml -R allay-ai/site` with a token that may (the family's `FAMILY_ACTIONS_TOKEN`).

## The Worker

- `wrangler.jsonc`: the Worker `allay-site` on the route `allay.chat/*`; `run_worker_first` sends every path but the assets to the script. `isBackendPath` in `worker/index.ts` picks the backend's (`/api/*`, `/admin`, `/admin/*`); everything else is a page from `dist/`, to which the Worker adds Spain's legal notice for visitors from Spain.
- Spain's legal notice (LSSI Art. 10: name, NIE, address, email) lives only in the Worker secret `LEGAL_NOTICE`, never in the repository or `dist/`. With it set, pages vary by `cf-ipcountry` and are `private, no-cache`; without it, nobody sees a notice.
- It streams requests and answers through without reading them, so the chat's SSE arrives token by token. It strips hop-by-hop headers, sets `X-Forwarded-For` and `X-Real-IP` from `CF-Connecting-IP` (dropping what a client sent), and `X-Forwarded-Host`/`-Proto`. The backend trusts them through its `TRUSTED_PROXIES` and `CLIENT_IP_HEADER` settings.
- Its own answers: a plain-text `502` when the origin is unreachable or Cloudflare reports 520–530. The plugin retries a bodiless 502–504 (`Retry.kt` in allay-ai/minecraft); never turn that into JSON, or the plugin stops retrying. The backend's own errors pass untouched.
- `ORIGIN` must not be covered by any Worker route, or requests loop.

## Checking a change

1. `pnpm lint`, `pnpm test`, and `pnpm build`. Read the build's wiki warnings.
2. `npx --yes wrangler@4.151.3 dev --port 8799` serves `dist/` with `public/_headers` and the Worker. With a backend of your own, add `--var ORIGIN:http://127.0.0.1:3000`; `curl -N -X POST localhost:8799/api/v2/chat …` should print events as they come.
3. In a headless browser (Playwright with `channel: "chrome"`), open every page of `dist/sitemap.xml` and a missing one, at 1280 px and 360 px, light and dark: no console errors (a CSP violation is one), and `document.documentElement.scrollWidth` never above `clientWidth`.

## Deploying

- The “build” workflow deploys on every push to `main` and when a wiki moved, with the secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Cloudflare builds nothing; what ships is what CI built.
- By hand: `pnpm build && pnpm run deploy` (`pnpm deploy` alone is pnpm's own command).
- Keep the Worker's name `allay-site`; another name deploys a second Worker nobody routes to.

## Versions

For `/update-deps`: packages in `package.json` (exact versions, locked in `pnpm-lock.yaml`), pnpm in `packageManager`, wrangler and Playwright in the `package.json` scripts and the workflow, the actions in `.github/workflows/`, and `compatibility_date` in `wrangler.jsonc`. The site has no Minecraft version of its own; the one it names (26.3, Java 25) follows the plugin's README.
