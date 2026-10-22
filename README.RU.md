# Allay Site

[English version](README.md)

Исходники [allay.chat](https://allay.chat): главная страница [Allay](https://github.com/allay-ai/minecraft) — ИИ-помощника для серверов Minecraft, — его руководство в `/wiki/`, политика конфиденциальности и условия использования. Всё это отдаёт Cloudflare Worker, а пути бэкенда он передаёт в [Allay Server](https://github.com/allay-ai/server).

## Как начать

```text
corepack enable
pnpm install
pnpm dev
```

`pnpm dev` один раз скачивает вики и запускает Vite на `http://localhost:5173`.

## Что внутри

- **Главная страница** на английском — `/`, на русском — `/ru/`. Все тексты лежат в `src/i18n/`, по файлу на язык.
- **Вики** — `/wiki/` (из allay-ai/server) и `/wiki/plugin/` (из allay-ai/minecraft). Сборка рендерит их из вики на GitHub.
- **Правовые страницы** — `/privacy/` и `/terms/`, только на английском. В них есть `[[OWNER NAME]]`, `[[ADDRESS]]`, `[[CONTACT EMAIL]]` и ещё несколько полей: их нужно заполнить, прежде чем тексты начнут действовать.
- **Worker** в `worker/`. Он запускается только для `/api/*`, `/admin` и `/admin/*` и потоком передаёт их бэкенду без изменений.

Сайт не ставит cookie, не собирает аналитику и ничего не грузит у других компаний: шрифты лежат вместе с ним.

## Стек

React 19 и TypeScript, маршруты на `react-router-dom`, стили на LESS в CSS-модулях, сборка на Vite с пререндером в отдельный HTML-файл для каждой страницы. Линтер и форматтер — Biome. pnpm закреплён в `package.json` и подключается через Corepack.

## Команды

| Команда | Что делает |
|---|---|
| `pnpm build` | Скачивает вики и свежие релизы, проверяет типы, собирает и пререндерит в `dist/` |
| `pnpm lint` | Biome; `pnpm lint:fix` исправляет, что может |
| `pnpm test` | Тесты Worker на встроенном тест-раннере Node |
| `pnpm content` | Заново скачивает вики без сборки |
| `pnpm worker:dev` | Собранный сайт и Worker на `http://localhost:8787` — так, как их запускает Cloudflare |
| `pnpm og`, `pnpm icons` | Перерисовывают превью ссылки из `tools/og.html`, а PNG-иконки и логотип — из `public/icon-512.png` (копия `media/icon-512.png` из allay-ai/.github; нужен ImageMagick) |

## Вики

Источник — сами вики: правьте их на GitHub, а не здесь. Сборка клонирует их в `.content/`, рендерит каждую страницу в HTML и связывает страницы ссылками внутри сайта. Сырой HTML в Markdown выводится как текст, поэтому никто из тех, кто может править вики, не встроит скрипт на allay.chat.

Workflow «build» раз в час проверяет вики и разворачивает сайт, если какая-то изменилась. Чтобы обновить сразу, запустите его вручную: `gh workflow run build.yml -R allay-ai/site`.

## Развёртывание

Пуш в `main` собирает, проверяет и разворачивает сайт через `wrangler deploy`. Workflow нужны секреты `CLOUDFLARE_API_TOKEN` и `CLOUDFLARE_ACCOUNT_ID`. Вручную: `pnpm build && pnpm run deploy`.

Worker `allay-site` отвечает на маршруте `allay.chat/*` и отправляет пути бэкенда на `ORIGIN` из `wrangler.jsonc` — по умолчанию `https://origin.allay.chat`, имя, которое ведёт к бэкенду через Cloudflare Tunnel.

## Лицензия

MIT. Minecraft — товарный знак Mojang Synergies AB; Allay не связан с Mojang и Microsoft.
