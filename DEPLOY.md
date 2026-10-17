# Deploy LifeWrapped from your iPhone — no Expo needed

LifeWrapped is a static, mobile-friendly website. You can use it like an app by adding it to your iPhone Home Screen.

## Deploy with Netlify

1. Merge the **LifeWrapped simple deploy** pull request into `main`.
2. In Safari, open https://app.netlify.com and create/sign in to an account.
3. Choose **Add new project → Import an existing project → GitHub**.
4. Authorize GitHub and select `SatyanThayaparan/life-app`.
5. Choose branch `main`. Netlify should read `netlify.toml`: **no build command** and publish directory **.** (repository root).
6. Deploy. Open the `*.netlify.app` URL Netlify gives you.
7. On your iPhone, open the site in Safari, tap **Share → Add to Home Screen**, then **Add**.

## Updating the app

Push/merge changes to `main`. Netlify automatically redeploys from GitHub.

## Important limitations

Your activities are stored **only in the browser's local storage** on that device and site origin. No cloud sync or backup yet. Clearing website data or switching domains can remove access to the saved history. The app needs an internet connection for the site and fonts. iOS may not use the SVG icon as the Home Screen icon on all versions; a fallback icon may appear.

This approach does not create an App Store app. It avoids Expo, EAS, and Apple Developer enrollment.
