# LifeWrapped Phase 3: Wrapped stories

Open the main app and select **View My Wrapped** under monthly/yearly highlights. Tap Next/Back or swipe horizontally on the card. Tap **Save / Share this card** to generate a 1080×1350 PNG via Canvas. On iOS Safari, the native share sheet is used if file sharing is supported; otherwise the browser attempts a download (which may require checking Files/Downloads).

Test Lab: open `/?testlab=1`, choose a fixture and simulated date, then tap **Play Wrapped story**. This uses test data only and leaves the production storage key untouched.

Automated tests: `npm test` checks empty, month/year boundaries, streaks and large histories. GitHub Actions runs tests and Vite build. Offline precaching is unchanged and should be tested after deployment.

Limitations: initial release supports manual slide navigation and individual card sharing; no automatic playback, video export or multi-card sharing yet. iOS save/share behavior requires device verification.