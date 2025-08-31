type ThemeType = "light" | "dark";
function getPreferredColorScheme(): ThemeType {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getCurrentTheme(): ThemeType {
  // <html lang="zh" data-hairline="true" class="itcauecng" data-theme="light" data-rh="data-theme">
  const htmlElement = document.documentElement;
  return htmlElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}
async function asyncSleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const preferredTheme = getPreferredColorScheme();
  const currentTheme = getCurrentTheme();

  const url = new URL(window.location.href);

  if (currentTheme != preferredTheme) {
    url.searchParams.set("theme", preferredTheme);
    console.log(`Try to reload the page with ${preferredTheme} theme`);
    window.location.replace(url);
  } else {
    console.log(`The page is already in ${preferredTheme} theme`);
    if (url.searchParams.has("theme")) {
      await asyncSleep(1000);
      url.searchParams.delete("theme");
      window.history.replaceState({}, "", url);
    }
  }
}

main();
