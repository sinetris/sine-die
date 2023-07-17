const themeToggleButton = document.querySelector("button.theme-switcher");
themeToggleButton.addEventListener("click", toggleTheme);
function toggleTheme() {
  var root = document.body;
  if (root.classList.contains("theme-dark")) {
    root.classList.remove("theme-dark");
    root.classList.add("theme-light");
  } else if (root.classList.contains("theme-light")) {
    root.classList.remove("theme-light");
    root.classList.add("theme-dark");
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.classList.remove("theme-default");
    root.classList.add("theme-light");
  } else {
    root.classList.remove("theme-default");
    root.classList.add("theme-dark");
  }
}
