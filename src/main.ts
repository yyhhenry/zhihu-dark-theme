type ThemeType = "light" | "dark";

async function asyncSleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getPreferredColorScheme(): ThemeType {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getCurrentTheme(): ThemeType {
  const htmlElement = document.documentElement;
  return htmlElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

async function syncTheme() {
  const preferredTheme = getPreferredColorScheme();
  const currentTheme = getCurrentTheme();
  const url = new URL(window.location.href);

  if (currentTheme !== preferredTheme) {
    if (url.searchParams.get("theme") === preferredTheme) {
      console.log(`The page is already in ${preferredTheme} theme`);
      return;
    }
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

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", syncTheme);

syncTheme();
