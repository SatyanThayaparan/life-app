# LifeWrapped — cloud builds from your iPhone

This project uses Expo Application Services (EAS) to build native apps in the cloud and GitHub Actions to request builds. You do **not** need to operate Codespaces for every build.

## One-time setup

1. Merge the native Expo app PR and then the EAS setup PR into `main`. GitHub Actions workflows are easiest to dispatch from the default branch.
2. Create a free account at https://expo.dev (or sign in).
3. Create an Expo project and obtain its **project ID (UUID)**. If Expo requires first-time local linking via `eas init`, complete that one-time step using a terminal or Expo's available web project setup; the GitHub workflow cannot create the project for you.
4. Create an Expo personal access token in your Expo account settings.
5. In GitHub, open **Settings → Secrets and variables → Actions**. Under **Secrets**, create `EXPO_TOKEN` with your token. Under **Variables**, create `EXPO_PROJECT_ID` with the project UUID.
6. In your Expo account, configure the required Apple credentials for iOS builds (typically an Apple Developer Program membership) and any required distribution/provisioning. The first iOS build may need an interactive EAS setup to configure signing; the workflow is non-interactive and cannot complete credential prompts.

## Request a build from your phone

1. In GitHub, open **Actions → Expo cloud build → Run workflow**.
2. Select `main`, platform `ios` or `android`, and profile `preview` or `production`.
3. Run the workflow. It submits a build request to Expo; the actual build progress and download/install link are on https://expo.dev.
4. For iOS preview builds, register the iPhone as a test device if required by Apple's ad hoc distribution rules **before** requesting the build.

## Important

- **Expo Go** is different from a standalone EAS build. Expo Go requires a development server; a standalone EAS build does not.
- iOS internal distribution generally requires Apple signing credentials and device registration. App Store distribution requires additional Apple configuration.
- This workflow submits builds using `--no-wait`, so a green GitHub workflow means the request was accepted, **not** that the cloud build succeeded.
- `EXPO_PROJECT_ID` is injected into the Expo configuration through `app.config.js`. The token is a secret: never commit it.
- Expo build quotas and Apple membership fees may apply.
- If dependency validation fails, align Expo dependencies with `npx expo install --fix` and commit the updated lockfile.
