# LifeWrapped v2 — iPhone testing (free)

## Deploy separately from the existing app

**Do not change the existing Netlify site settings.** Create a **new** Netlify site by importing the same GitHub repository, and set:

- Branch: `main` (after this PR merges)
- Base directory: `v2`
- Build command: `npm install && npm run build`
- Publish directory: `dist` (relative to base directory)

The `v2/netlify.toml` file also defines the v2 build. Netlify may show publish paths relative to the repository root depending on the UI; verify the resolved directory is `v2/dist`. Do not point the existing production site at v2.

## Install from iPhone

1. Open the **new v2 URL** in Safari (HTTPS required).
2. Tap Share > Add to Home Screen > Add.
3. Open LifeWrapped v2 from the Home Screen.
4. Load it online at least once, then try airplane mode and reopen it.
5. Log a test entry, close and reopen, export a backup, and verify the data survives.

## Known limits

- This is a PWA, **not** a signed native iOS binary.
- Web storage is specific to this preview URL; data does not sync with the existing app or Capacitor automatically.
- Offline support is best-effort: initial install requires a connection, and Safari may evict website storage. Keep JSON backups.
- The service worker caches successful same-origin GET requests after visiting pages/assets online. iOS may not offer identical download/share behavior to desktop browsers.
- This is an independent preview; the Wrapped/native storage PR should be merged separately once its checks pass.
