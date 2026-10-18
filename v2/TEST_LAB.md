# LifeWrapped v2 Test Lab

Open **https://gleeful-valkyrie-746bbe.netlify.app/?testlab=1** in Safari after this pull request is deployed. The regular app remains at the URL without the query parameter.

## Safety
- Test Lab uses only `lifewrapped.test.entries.v1`, never `lifewrapped.entries.v1`.
- It does not import real activities, and its reset/clear buttons affect only test logs.
- The date picker simulates the app's reference date without changing the phone clock.
- Each scenario/date change regenerates synthetic logs; manual changes in the Test Lab are intentionally replaced.
- The Test Lab is a QA tool, not an authentication or privacy boundary. Do not enter sensitive data into sample logs.
- Production data remains in the same origin-specific browser storage; export a backup before any major app upgrade.

## Scenarios
Empty history; 14-day consistent activity; missed days; October/November rollover; December/January rollover; leap day; 500-entry power user.

## CI
From `v2`, run `npm test` and `npm run build`. GitHub Actions executes both for changes in v2. Tests cover streaks, month/year boundaries, leap day, 500 logs, optional field validation, simulated future dates, analytics after editing/deleting, and JSON serialization round trips.

## Scope
The Test Lab shows summary cards, weekly activity, Wrapped highlights, and sample log management. It does not change the production app's clock or validate every interaction in the production UI. Browser automation and offline/device testing remain separate follow-up work.
