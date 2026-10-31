# zhihu-dark-theme

A Tampermonkey userscript that enables the dark theme on Zhihu by following your system color scheme.

When the page theme does not match the system preference, the script reloads the page with the matching `theme` parameter. Once the theme is right, the parameter is cleaned out of the address bar after a second. Changing the system preference re-syncs the page.

## Quick Start

1. Install Tampermonkey from [tampermonkey.net](https://www.tampermonkey.net/).

2. Add the script from the latest GitHub release: [zhihu-dark-theme.user.js](https://github.com/yyhhenry/zhihu-dark-theme/releases/latest/download/zhihu-dark-theme.user.js).

## Development

```sh
vp install   # Install dependencies
vp config    # One-time per clone: install the commit hooks
vp pack      # Build dist/zhihu-dark-theme.user.js
vp run local # Build + serve for local Tampermonkey install
```

The build writes `dist/zhihu-dark-theme.user.js`, ready to install or release.
