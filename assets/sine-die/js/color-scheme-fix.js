'use strict';

var theme = false;

if (theme = localStorage.getItem("theme-color-scheme")) {
  document.documentElement.setAttribute("data-color-scheme", theme);
}
