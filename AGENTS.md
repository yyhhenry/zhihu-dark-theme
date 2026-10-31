# zhihu-dark-theme

A Tampermonkey userscript that enables the dark theme on Zhihu by following the system color scheme. On load, `syncTheme()` compares the page theme (`<html data-theme>`) with the `prefers-color-scheme` preference: on mismatch it reloads the page with `?theme=dark|light`; on match it strips the `theme` parameter from the URL after one second. A `matchMedia` change listener re-syncs when the system preference changes.

## Key Files

| Path                 | Purpose                                                      |
| -------------------- | ------------------------------------------------------------ |
| `src/main.ts`        | Userscript entry: theme detection, reload, and URL cleanup.  |
| `utils/metadata.ts`  | Builds the `// ==UserScript==` banner from `ScriptMetadata`. |
| `vite.config.ts`     | Vite+ configuration: format, lint, and pack settings.        |
| `dist/`              | Build output. Generated; never edit by hand.                 |
| `.github/workflows/` | CI check and release workflows.                              |

`vp pack` (tsdown) bundles `src/main.ts` and writes `dist/zhihu-dark-theme.user.js`: a single minified ESM script (target `es2020`) with the userscript banner prepended. Installed users auto-update through `updateURL`, so do not change the output file name or banner fields.

## Vite+

This project uses [Vite+](https://viteplus.dev/guide/) (`vp`) for package management and code quality. Docs are local at `node_modules/vite-plus/docs`. Run `vp help` or `vp <command> --help` for details.

- `vp install` — install dependencies.
- `vp check` — format (Oxfmt), lint (Oxlint), and type check; config lives in `vite.config.ts`.
- `vp pack` — bundle the userscript with tsdown into `dist/`. Note `vp build` is the Vite production build for apps, a different thing.
- `vp run local` — build and serve `dist/` with `vp preview`, opening the `.user.js` install link in the browser for quick local installs.

A Vite+ pre-commit hook (`.vite-hooks/pre-commit`) runs `vp staged`, which fixes up staged files on every commit. Run `vp config` once per clone to install the hook dispatcher. Escape hatch: `VP_GIT_HOOKS=0 git commit`.

Code, comments, and documentation are written in English.
