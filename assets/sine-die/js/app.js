'use strict';

// Menubar
var menubarNavs = document.querySelectorAll('[role="menubar"]');
for (var i = 0; i < menubarNavs.length; i++) {
  new MenubarNavigation({element: menubarNavs[i]});
}

// Light/Dark Theme Switcher button
const root = document.documentElement;
const switchButton = document.querySelector('button[data-function="switch-color-scheme"]');
new ManageColorScheme(root, switchButton);

// Mobile menu button
const responsiveMenuButton = document.querySelector(".menu-icon");
responsiveMenuButton.addEventListener("click", responsiveMenu);
