// -- (start) Dark/Light Theme switch --
const getValidThemes = () => {
  const defaultIsDark = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  return defaultIsDark ? ["theme-default", "theme-light", "theme-dark"] : ["theme-default", "theme-dark", "theme-light"];
}

const validThemes = getValidThemes();

const setTheme = (themeMode, validThemes) => {
  var root = document.body;
  for (const theme of validThemes) {
    root.classList.remove(theme);
  }
  if (validThemes.includes(themeMode)) {
    localStorage.setItem("theme-mode", themeMode);
    root.classList.add(themeMode);
  }
}

const getTheme = () => {
  let themeMode = localStorage.getItem("theme-mode");
  if (themeMode === null) themeMode = "theme-default";
  return themeMode;
}

const refreshTheme = () => {
  let themeMode = getTheme();
  setTheme(themeMode, validThemes);
}

const switchTheme = () => {
  let themeMode = getTheme();
  const nextThemeMode = validThemes.at((validThemes.indexOf(themeMode) + 1) % validThemes.length);
  setTheme(nextThemeMode, validThemes);
}

refreshTheme();

const themeSwitchButton = document.querySelector(".theme-switcher button");
themeSwitchButton.addEventListener("click", switchTheme);
// -- (end) Dark/Light Theme switch --

// -- (start) Mobile menu --
function responsiveMenu() {
  const responsiveClass = "responsive";
  var menuElement = document.getElementById("primary-navigation");
  if (menuElement.classList.contains(responsiveClass)) {
    menuElement.classList.remove(responsiveClass);
  } else {
    menuElement.classList.add(responsiveClass);
  }
}

const responsiveMenuButton = document.querySelector(".menu-icon");
responsiveMenuButton.addEventListener("click", responsiveMenu);
// -- (end) Mobile menu --
