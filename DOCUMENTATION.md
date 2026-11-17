# LifeWrapped (life-app) — Documentation

## What this project is

A personal activity logger that turns everyday time entries into monthly/yearly insights and a shareable “Wrapped” style card—similar in spirit to year-end music recaps, but for your own habits.

## Tech stack

| Layer | Choice | Why it’s used |
| --- | --- | --- |
| Production app (root) | HTML, CSS, vanilla JavaScript | Simple static app with no build step |
| Hosting | Netlify (`netlify.toml`) | Static site deploy |
| Storage | Browser `localStorage` | Keep entries on-device without a backend |
| Backup | JSON import/export | Move or back up data between browsers/devices |
| Prototype (`v2/`) | React 19, Vite, Capacitor 7 | Same idea packaged toward iOS/Android shells |

## How the logic works (production root app)

1. **Load saved entries** — On open, the app reads activity entries from `localStorage` (key like `lifewrapped.entries.v1`).
2. **Log time** — A dialog captures category, date, minutes, and notes, then appends a new entry to the local list.
3. **Dashboard filters** — Views summarize totals by month or year so patterns are easy to scan.
4. **Wrapped card** — Canvas drawing code turns selected stats into a shareable image (PNG).
5. **Backup / restore** — Export downloads a JSON backup; import reloads entries from that file.

The `v2/` folder reimplements the experience with React and Capacitor for native packaging. It aims to keep a compatible backup shape, but storage is separate from the root static app.

## Project map

### Root — production LifeWrapped (static)
This is the live/simple version: no build step.

| Path | Role |
| --- | --- |
| `index.html` | Page structure and UI shell |
| `app.js` | Logging, `localStorage`, dashboard filters, Wrapped image generation, import/export |
| `styles.css` | Visual design for the static app |
| `manifest.webmanifest` | PWA-style name/icons/display hints |
| `icon.svg` | App icon |
| `netlify.toml` | Netlify publish settings |
| `DEPLOY.md` | Deploy notes for the static site |
| `README.md` / `DOCUMENTATION.md` | Usage overview and this deeper map |

### `v2/` — React + Capacitor prototype
A newer implementation aimed at packaging toward mobile shells while keeping the same product idea.

| Path | Role |
| --- | --- |
| `v2/src/main.jsx` | React entry |
| `v2/src/tracking.js` | Activity entry create/load/save helpers |
| `v2/src/insights.js` | Aggregations for dashboards/stats |
| `v2/src/wrapped-story.js` + `WrappedStory.jsx` | Story-style Wrapped experience |
| `v2/src/*.test.js` | Unit tests around tracking/insights/story logic |
| `v2/src/testlab/` | Manual/experimental test UI helpers |
| `v2/public/` | Icons, manifest, service worker assets |
| `v2/scripts/` | Build helpers (for example precache) |
| `v2/capacitor.config.json` | Native shell configuration |
| `v2/IPHONE_TESTING.md`, `TEST_LAB.md`, `WRAPPED_STORIES.md` | Prototype-specific notes |

### `.github/workflows/`
CI workflow(s) for the v2 app (for example checks on the React prototype).

### Which tree should you edit?
- Change **day-to-day production behavior** in the **root** `index.html` / `app.js` / `styles.css`.
- Change **mobile/prototype experiments** under **`v2/`**.

## Mental model

Think **spreadsheet + year-in-review poster, running entirely in the browser**. Your phone/laptop is the database; JSON backups are the USB stick you use when you want to move data.
