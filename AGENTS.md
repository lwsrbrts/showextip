# AGENTS.md

WebExtensions add-on ("Show External IP") for Chrome and Firefox. No build system, no package manager, no tests, no CI — each top-level browser directory is itself the shippable extension.

## Layout

- `chrome/` and `firefox/` — self-contained unpacked extensions. Load `chrome/` at `chrome://extensions` (Developer mode → "Load unpacked") or `firefox/` via `about:debugging` to run/test.
- `resources/` — original `.ai` icon artwork. Source of truth for regenerating icons; not used at runtime.
- `unused/` — old PNG icons, kept for reference only. Never referenced by either manifest.

## Duplication rule (important)

`showextip.js`, `showextip.html`, and `66.gif` are kept **byte-identical** in `chrome/` and `firefox/` (verified with `diff`). Any change to shared code must be applied to both copies.

The `manifest.json` and icon files **intentionally differ** and must not be synced:

- Firefox: Manifest V2, SVG icons + `browser_action.theme_icons` (light/dark); version `1.0.6`.
- Chrome: Manifest V3 (`action` + `host_permissions`), PNG icons; version `1.0.1` (versions are released independently per store).

## External dependency

- The IP is fetched from `https://showextip.azurewebsites.net/`, which returns HTML like `Current IP Address: 1.2.3.4:5678`. The regex in `showextip.js` extracts the IP only (drops the port) — keep it working if the endpoint format changes.
- Any host used in `showextip.js` must also be listed in `permissions` of **both** manifests (noted in a code comment). CORS/permissions failures surface in the popup as "Unable to refresh."

## Verification

No automated checks exist. Manual verification: load the unpacked extension, click the toolbar icon, confirm the popup shows an IP (or a sensible error) rather than the spinner.
