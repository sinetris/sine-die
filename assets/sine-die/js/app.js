'use strict';

// Menubar
try {
  var menubarNavs = document.querySelectorAll('[role="menubar"]');
  for (var i = 0; i < menubarNavs.length; i++) {
    new MenubarNavigation({element: menubarNavs[i]});
  }
} catch (e) {
  console.error(`${e.name}: ${e.message}`);
}

// Light/Dark Theme Switcher button
try {
  const root = document.documentElement;
  const switchButton = document.querySelector('button[data-function="switch-color-scheme"]');
  window.colorSchemaManager = new ColorSchemaManager(root, switchButton);
} catch (e) {
  console.error(`${e.name}: ${e.message}`);
}

// Mobile menu button
try {
  const mobileMenuButton = document.querySelector('[data-function="mobile-menu"]');
  new MobileMenu(mobileMenuButton);
} catch (e) {
  console.error(`${e.name}: ${e.message}`);
}

// Copy code button
try {
  var preCodeBlocks = document.querySelectorAll('.highlight pre:has(code[data-lang])');
  for (var i = 0; i < preCodeBlocks.length; i++) {
    new CodeBlockCopyButton(preCodeBlocks[i]);
  }
} catch (e) {
  console.error(`${e.name}: ${e.message}`);
}
