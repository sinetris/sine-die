const getValidThemes = () => {
  const defaultIsDark = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  return defaultIsDark ? ["theme-default", "theme-light", "theme-dark"] : ["theme-default", "theme-dark", "theme-light"];
}

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

const refreshTheme = () => {
  let themeMode = localStorage.getItem("theme-mode");
  if (themeMode === null) themeMode = "theme-default";
  setTheme(themeMode, getValidThemes());
}

const switchTheme = () => {
  let themeMode = localStorage.getItem("theme-mode");
  if (themeMode === null) themeMode = "theme-default";
  const validThemes = getValidThemes();
  const nextThemeMode = validThemes.at((validThemes.indexOf(themeMode) + 1) % validThemes.length);
  setTheme(nextThemeMode, validThemes);
}

refreshTheme();

const themeSwitchButton = document.querySelector("button.theme-switcher");
themeSwitchButton.addEventListener("click", switchTheme);

function responsiveMenu() {
  const responsiveClass = "responsive";
  var menuElement = document.getElementById("primary-navigation");
  if (menuElement.classList.contains(responsiveClass)) {
    menuElement.classList.remove(responsiveClass);
  } else {
    menuElement.classList.add(responsiveClass);
  }
}

const responsiveMenuButton = document.querySelector(".menu-icon>button");
responsiveMenuButton.addEventListener("click", responsiveMenu);
