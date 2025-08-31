function getPreferredColorScheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function main() {
  const currentUrl = new URL(window.location.href);
  const preferredTheme = getPreferredColorScheme();

  const themeParam = currentUrl.searchParams.get("theme");
  if (themeParam != preferredTheme) {
    currentUrl.searchParams.set("theme", preferredTheme);
    console.log(`Try to reload the page with ${preferredTheme} theme`);
    window.location.replace(currentUrl.toString());
  } else {
    console.log(`The page is already in ${preferredTheme} theme`);
  }
}

main();
