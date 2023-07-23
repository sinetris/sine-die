function setTheme(themeMode, validThemes) {
  var root = document.body;
  for (const theme of validThemes) {
    root.classList.remove(theme);
  }
  if (validThemes.includes(themeMode)) {
    localStorage.setItem("theme-mode", themeMode);
    root.classList.add(themeMode);
  }
}

const themeSwitchButton = document.querySelector("button.theme-switcher");
themeSwitchButton.addEventListener("click", switchTheme);
function switchTheme() {
  let themeMode = localStorage.getItem("theme-mode");
  if (themeMode === null) themeMode = "theme-default";
  const validThemes =
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ?
      ["theme-default", "theme-dark", "theme-light"]
      :
      ["theme-default", "theme-light", "theme-dark"];
  const nextThemeMode = validThemes.at((validThemes.indexOf(themeMode) + 1) % validThemes.length);
  setTheme(nextThemeMode, validThemes);
}
