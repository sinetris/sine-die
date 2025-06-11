'use strict';

var theme = false;

if (theme = localStorage.getItem("theme-mode")) {
  document.documentElement.setAttribute("data-color-scheme", theme);
}
