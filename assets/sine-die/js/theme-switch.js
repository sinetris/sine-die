// Dark/Light Theme Switch button

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
