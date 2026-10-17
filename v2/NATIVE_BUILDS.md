# LifeWrapped v2 — native build status

This branch adds Capacitor Preferences for device-local activity storage, Wrapped card downloads, and CI builds.

## Build artifacts

GitHub Actions workflow **LifeWrapped v2 native builds**:
- Android: produces a **debug-signed APK** for testing, downloadable from the workflow run's artifacts. This is not a Play Store release build.
- iOS: compiles for the **iOS simulator without signing**. This cannot be installed on a physical iPhone.

## iPhone installation requirements

For TestFlight or a physical iPhone build, Apple signing must be configured with an Apple Developer team, distribution certificate, provisioning profile and an App Store Connect workflow. These require account-holder authorization. **No iPhone-installable signed IPA is produced yet.** Never commit signing keys or passwords to the repository.

## Data migration

Native app data is stored with Capacitor Preferences and is separate from Safari/Netlify storage. Export JSON from the existing web app and import into the native app. The current native import/export interface uses browser file controls and downloads; verify those on real devices before relying on them. For long-term reliable native backup sharing, integrate Capacitor Filesystem/Share and a native document picker.

## Current limitations

Native projects are generated on CI runners instead of checked in. Debug Android artifact and unsigned iOS simulator compilation are first-step verification, not a production release. Wrapped image downloads also need real-device testing. The old Netlify app on the repository root is unchanged.
