# LifeWrapped v2

React + Capacitor prototype of LifeWrapped. The root Netlify web app remains the production surface.

## Features

- Log, edit, delete, and search activities
- Category filters and period totals
- JSON backup import/export compatible with the root app schema

## Tech stack

- React
- Vite
- Capacitor (Android / iOS)

## Setup

```bash
cd v2
npm install
npm run dev
```

## Usage

- `npm run dev` — local web prototype
- `npm run build` — web build
- `npm run cap:sync` — sync a web build into native projects after `npx cap add android` / `ios`

## Notes

- Storage is still device/origin specific; export from the root app and import here to migrate data.
- Native persistence, full Wrapped card parity, and signed builds are not finished yet.
