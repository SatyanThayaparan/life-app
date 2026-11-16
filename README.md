# LifeWrapped

Mobile-friendly web app for logging everyday activities and turning them into monthly and yearly recaps.

## Features

- Log activities with category, date, minutes, and optional notes
- Dashboard totals for this month or this year
- Top-activity breakdown and recent timeline
- Shareable Wrapped recap card (generated on-device)
- JSON export/import backup
- Optional `v2/` React + Capacitor prototype for native packaging

## Tech stack

- HTML, CSS, and vanilla JavaScript (production web app)
- Netlify for static hosting
- React + Vite + Capacitor in `v2/` (prototype)

## Setup

### Web app (root)

1. No build step required for the root app.
2. Open `index.html` in a browser, or serve the folder with any static server.
3. For Netlify: deploy from the `main` branch (see `netlify.toml` and [DEPLOY.md](DEPLOY.md)).

### v2 prototype

```bash
cd v2
npm install
npm run dev
```

## Usage

1. Tap **Log an activity** to save a moment.
2. Switch between **This month** and **This year** on the dashboard.
3. Use **Export/Import backup** to move data between devices.
4. Generate a Wrapped card and download it from your device.

## Project structure

```text
life-app/
├── index.html          # production web app
├── app.js
├── styles.css
├── DEPLOY.md           # iPhone / Netlify notes
└── v2/                 # React + Capacitor prototype
```

## Notes

- Activity data is stored in browser storage on the current device only; there is no cloud sync yet.
- `v2` shares the same backup schema but does not automatically sync with the root web app.
