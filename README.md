# Allay Site

[Русская версия](README.RU.md)

The source of [allay.chat](https://allay.chat): the front page of [Allay](https://github.com/allay-ai/minecraft), the AI helper for Minecraft servers, its manual under `/wiki/`, the privacy policy, and the terms. A Cloudflare Worker serves it all and passes the backend's paths on to [Allay Server](https://github.com/allay-ai/server).

## Get started

```text
corepack enable
pnpm install
pnpm dev
```

`pnpm dev` fetches the wikis once and starts Vite at `http://localhost:5173`.

## What's inside

- **The front page** at `/`, in English, at `/ru/` in Russian, and at `/es/` in Spanish. Every text sits in `src/i18n/`, one file per language.
- **The wiki** at `/wiki/` (allay-ai/server's) and `/wiki/plugin/` (allay-ai/minecraft's), rendered from the GitHub wikis at build time.
- **Legal pages** at `/privacy/` and `/terms/`, English only. They carry `[[OWNER NAME]]`, `[[ADDRESS]]`, `[[CONTACT EMAIL]]`, and a few more fields to fill in before they bind anyone.
- **The Worker** in `worker/`. It runs only for `/api/*`, `/admin`, and `/admin/*`, and streams them to the backend unchanged.

The site sets no cookies, runs no analytics, and loads nothing from other companies: the fonts ship with it.

## Stack

React 19 and TypeScript, routes on `react-router-dom`, styles in LESS CSS modules, built with Vite and prerendered to one HTML file per page. Biome lints and formats. pnpm, pinned in `package.json`, comes through Corepack.

## Commands

| Command | What it does |
|---|---|
| `pnpm build` | Fetches the wikis and the newest releases, checks types, builds, and prerenders into `dist/` |
| `pnpm lint` | Biome; `pnpm lint:fix` fixes what it can |
| `pnpm test` | The Worker's tests, on Node's own test runner |
| `pnpm content` | Fetches the wikis again without building |
| `pnpm worker:dev` | The built site and the Worker on `http://localhost:8787`, as Cloudflare runs them |
| `pnpm og`, `pnpm icons` | Redraw the link preview from `tools/og.html`, and the PNG icons and the logo from `public/icon-512.png` (a copy of allay-ai/.github's `media/icon-512.png`; ImageMagick) |

## The wiki

The wikis stay the source: edit them on GitHub, not here. The build clones them into `.content/`, renders each page to HTML, and links pages to each other on this site. Raw HTML in the Markdown shows as text, so nobody who may edit a wiki can put a script on allay.chat.

The “build” workflow checks the wikis every hour and deploys when one moved. To refresh at once, run it by hand: `gh workflow run build.yml -R allay-ai/site`.

## Deploying

A push to `main` builds, checks, and deploys with `wrangler deploy`. The workflow needs the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets. By hand: `pnpm build && pnpm run deploy`.

The Worker `allay-site` answers on the route `allay.chat/*` and sends the backend's paths to `ORIGIN` in `wrangler.jsonc`, `https://origin.allay.chat` by default: a hostname that reaches the backend through a Cloudflare Tunnel.

## License

MIT. Minecraft is a trademark of Mojang Synergies AB; Allay isn't affiliated with Mojang or Microsoft.
