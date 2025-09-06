// Dark/Light Theme Switch button

class ColorSchemeChangedEvent extends Event {
  #isDarkMode;

  constructor(isDarkMode) {
    super("ColorSchemeChanged");
    this.#isDarkMode = isDarkMode;
  }

  get isDarkMode() {
    return this.#isDarkMode;
  }
}

class ColorSchemaManager {
  #registeredHandlers = [];
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
    let theme = localStorage.getItem("theme-color-scheme");
    return this.validateTheme(theme);
  }

  get isDarkMode() {
    const theme = this.storedTheme;
    return theme === "dark" || (theme === "default" && this.preferColorScheme === "dark");
  }

  applyTheme(theme) {
    let newTheme = this.validateTheme(theme);
    localStorage.setItem("theme-color-scheme", newTheme);
    this.root.setAttribute("data-color-scheme", newTheme);
    this.#registeredHandlers.forEach(
      (element) => element.dispatchEvent(
        new ColorSchemeChangedEvent(this.isDarkMode),
      )
    );
  }

  registerEventHandler(element, funCallback) {
    this.#registeredHandlers.push(element);
    element.addEventListener(
      "ColorSchemeChanged",
      (event) => funCallback(event)
    );
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
