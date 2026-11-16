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

1. Clone the repo and enter the project folder:

```bash
git clone https://github.com/SatyanThayaparan/life-app.git
cd life-app
```

2. Serve the root folder with any static server. Easiest options:

```bash
# Option A: Python
python -m http.server 8080

# Option B: Node
npx --yes serve .
```

3. Open `http://localhost:8080` (or the URL printed by the server).
4. Optional iPhone / Netlify deploy steps are in [DEPLOY.md](DEPLOY.md).

### v2 prototype

1. From the repo root:

```bash
cd v2
npm install
npm run dev
```

2. Open the Vite URL shown in the terminal.

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
