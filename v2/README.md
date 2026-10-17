# LifeWrapped v2 — React + Capacitor

This is an **independent migration prototype**. The existing root Netlify app remains untouched.

## Local development

```sh
cd v2
npm install
npm run dev
```

## Web build

```sh
npm run build
```

## Native project generation (requires Android SDK or macOS/Xcode as applicable)

```sh
npm install
npx cap add android
npx cap add ios
npm run cap:sync
```

Capacitor iOS builds need macOS/Xcode and Apple signing for device distribution. The generated native directories should be committed after creation and validation. No Expo account is required.

## Data

The prototype uses the existing `lifewrapped.entries.v1` browser storage key and supports JSON backups with the same schema as the original app. Storage is still origin/device-specific; **native Capacitor storage does not automatically share data with Safari or Netlify**. Export on the old app and import in the new app. Long-term, use a dedicated native persistence layer and migrations.

## Status

Initial React prototype: logging, editing, deleting, search, category filter, period totals and JSON backup/import. The original Wrapped card UI, complete statistics, native persistence, offline asset handling, automated tests, and signed native builds remain to be implemented. Do not replace the production deployment yet.
