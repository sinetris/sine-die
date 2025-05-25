'use strict';
// -- (start) Dark/Light Theme switch --
class ManageColorScheme {
  constructor(root, switchButton) {
    this.root = root;
    this.switchButton = switchButton;
    this.switchButton.addEventListener("click", this.switchTheme.bind(this));
    this.applyTheme(this.storedTheme);
  }

  get preferColorScheme() {
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? "dark" : "light";
  }

  get storedTheme() {
    let theme = localStorage.getItem("theme-mode");
    return this.validateTheme(theme);
  }

  applyTheme(theme) {
    let newTheme = this.validateTheme(theme);
    localStorage.setItem("theme-mode", newTheme);
    this.root.setAttribute("data-color-scheme", newTheme);
  }

  switchTheme() {
    const nextTheme = this.nextTheme();
    this.applyTheme(nextTheme);
  }

  nextTheme() {
    const currentTheme = this.storedTheme;
    const nextThemeIndex = (this.#validThemes.indexOf(currentTheme) + 1) % this.#validThemes.length;
    const nextTheme = this.#validThemes.at(nextThemeIndex);
    return nextTheme;
  }

  validateTheme(theme) {
    return (theme === null || !this.#validThemes.includes(theme)) ? "default" : theme;
  }

  get #validThemes() {
    return (this.preferColorScheme === "dark") ? ["default", "light", "dark"] : ["default", "dark", "light"];
  }
}

window.addEventListener('load', function () {
  const root = document.documentElement;
  const switchButton = document.querySelector(".theme-switcher button");
  new ManageColorScheme(root, switchButton);
});
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
