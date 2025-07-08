/*
 *  This software or document includes material copied from or derived from the
 *  Menu and Menubar Pattern Examples [1] from the ARIA Authoring Practices Guide
 *  (APG) [2] and is licensed according to the W3C Software License [3].
 *  [1] https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
 *  [2] https://www.w3.org/WAI/ARIA/apg/
 *  [3] https://www.w3.org/copyright/software-license/
 */

'use strict';

class MenubarNavigation {
  constructor({element: domNode}) {
    this.domNode = domNode;

    this.menuitems = [];
    this.hasPopupMenu = [];
    this.menuitemGroups = {};
    this.menuOrientation = {};
    this.isSubMenu = {};
    this.isLinkMenuitem = {};

    this.firstChars = {}; // see Menubar init method
    this.firstMenuitem = {}; // see Menubar init method
    this.lastMenuitem = {}; // see Menubar init method

    this.initMenu(domNode, 0);

    window.addEventListener(
      'pointerdown',
      this.onBackgroundPointerdown.bind(this),
      true
    );

    let menubar = domNode.querySelector('[role=menuitem]');
    if (menubar) {
      menubar.tabIndex = 0;
    }
  }

  getMenuitems(domNode, depth) {
    var menuitems = [];

    var initMenu = this.initMenu.bind(this);
    var popups = this.hasPopupMenu;

    function findMenuitems(node) {
      var role, flag;

      while (node) {
        flag = true;
        role = node.getAttribute('role');

        if (role) {
          role = role.trim().toLowerCase();
        }

        switch (role) {
          case 'menu':
            initMenu(node, depth + 1);
            flag = false;
            break;

          case 'menuitem':
            if (node.getAttribute('aria-haspopup') === 'true') {
              popups.push(node);
            }
            menuitems.push(node);
            break;

          default:
            break;
        }

        if (flag && node.firstElementChild) {
          findMenuitems(node.firstElementChild);
        }
        node = node.nextElementSibling;
      }
    }
    findMenuitems(domNode.firstElementChild);
    return menuitems;
  }

  initMenu(menu, depth) {
    var menuitems, menuitem, role;

    var menuId = this.getMenuId(menu);

    menuitems = this.getMenuitems(menu, depth);
    this.menuOrientation[menuId] = this.getMenuOrientation(menu);

    this.isSubMenu[menuId] = menu.getAttribute('role') === 'menu' && depth > 0;

    this.menuitemGroups[menuId] = [];
    this.firstChars[menuId] = [];
    this.firstMenuitem[menuId] = null;
    this.lastMenuitem[menuId] = null;

    for (var i = 0; i < menuitems.length; i++) {
      menuitem = menuitems[i];
      role = menuitem.getAttribute('role');

      if (role.indexOf('menuitem') < 0) {
        continue;
      }

      menuitem.tabIndex = -1;
      this.menuitems.push(menuitem);
      this.menuitemGroups[menuId].push(menuitem);
      this.firstChars[menuId].push(
        menuitem.textContent.trim().toLowerCase()[0]
      );

      menuitem.addEventListener('keydown', this.onKeydown.bind(this));
      menuitem.addEventListener('click', this.onMenuitemAction.bind(this), {
        capture: true,
      });

      if (!this.firstMenuitem[menuId]) {
        if (this.hasSubMenu(menuitem)) {
          menuitem.tabIndex = 0;
        }
        this.firstMenuitem[menuId] = menuitem;
      }
      this.lastMenuitem[menuId] = menuitem;
    }
  }

  setFocusToMenuitem(menuId, newMenuitem) {
    this.closeSubMenuAll(newMenuitem);

    if (this.menuitemGroups[menuId]) {
      this.menuitemGroups[menuId].forEach(function (item) {
        if (item === newMenuitem) {
          item.tabIndex = 0;
          newMenuitem.focus();
        } else {
          item.tabIndex = -1;
        }
      });
    }
  }

  setFocusToFirstMenuitem(menuId) {
    this.setFocusToMenuitem(menuId, this.firstMenuitem[menuId]);
  }

  setFocusToLastMenuitem(menuId) {
    this.setFocusToMenuitem(menuId, this.lastMenuitem[menuId]);
  }

  setFocusToPreviousMenuitem(menuId, currentMenuitem) {
    var newMenuitem, index;

    if (currentMenuitem === this.firstMenuitem[menuId]) {
      newMenuitem = this.lastMenuitem[menuId];
    } else {
      index = this.menuitemGroups[menuId].indexOf(currentMenuitem);
      newMenuitem = this.menuitemGroups[menuId][index - 1];
    }

    this.setFocusToMenuitem(menuId, newMenuitem);

    return newMenuitem;
  }

  setFocusToNextMenuitem(menuId, currentMenuitem) {
    var newMenuitem, index;

    if (currentMenuitem === this.lastMenuitem[menuId]) {
      newMenuitem = this.firstMenuitem[menuId];
    } else {
      index = this.menuitemGroups[menuId].indexOf(currentMenuitem);
      newMenuitem = this.menuitemGroups[menuId][index + 1];
    }
    this.setFocusToMenuitem(menuId, newMenuitem);

    return newMenuitem;
  }

  setFocusByFirstCharacter(menuId, currentMenuitem, char) {
    var start, index;

    char = char.toLowerCase();

    // Get start index for search based on position of currentItem
    start = this.menuitemGroups[menuId].indexOf(currentMenuitem) + 1;
    if (start >= this.menuitemGroups[menuId].length) {
      start = 0;
    }

    // Check remaining slots in the menu
    index = this.getIndexFirstChars(menuId, start, char);

    // If not found in remaining slots, check from beginning
    if (index === -1) {
      index = this.getIndexFirstChars(menuId, 0, char);
    }

    // If match was found...
    if (index > -1) {
      this.setFocusToMenuitem(menuId, this.menuitemGroups[menuId][index]);
    }
  }

  // Utilities

  getIndexFirstChars(menuId, startIndex, char) {
    for (var i = startIndex; i < this.firstChars[menuId].length; i++) {
      if (char === this.firstChars[menuId][i]) {
        return i;
      }
    }
    return -1;
  }

  isPrintableCharacter(str) {
    return str.length === 1 && str.match(/\S/);
  }

  getMenuOrientation(node) {
    var orientation = node.getAttribute('aria-orientation');

    if (!orientation) {
      var role = node.getAttribute('role');

      switch (role) {
        case 'menubar':
          orientation = 'horizontal';
          break;

        case 'menu':
          orientation = 'vertical';
          break;

        default:
          break;
      }
    }

    return orientation;
  }

  async hashData(data) {
    const hash = await window.crypto.subtle.digest("SHA-256", data);
    return hash;
  }

  getMenuId(element) {
    var id;
    var role = element.getAttribute('role');
    var node = element;
    while (node && role !== 'menu' && role !== 'menubar') {
      node = node.parentNode;
      if (node) {
        role = node.getAttribute('role');
      }
    }
    if (node.id) {
      id = node.id;
    } else if (node.ariaLabel) {
      id = role + '-' + node.ariaLabel.trim().toLowerCase().replace(' ', '-').replace('/', '-');
    } else if (node.innerText) {
      id = role + '-' + this.hashData(node.innerText);
    } else {
      id = role + '-' + this.hashData(node.outerHTML);
    }
    return id;
  }

  getMenu(menuitem) {
    var menu = menuitem;
    var role = menuitem.getAttribute('role');

    while (menu && role !== 'menu' && role !== 'menubar') {
      menu = menu.parentNode;
      if (menu) {
        role = menu.getAttribute('role');
      }
    }

    return menu;
  }

  // Popup menu methods

  isAnyPopupOpen() {
    for (var i = 0; i < this.hasPopupMenu.length; i++) {
      if (this.hasPopupMenu[i].getAttribute('aria-expanded') === 'true') {
        return true;
      }
    }
    return false;
  }

  openPopup(menuitem) {
    var popupMenu = menuitem.nextElementSibling;

    if (popupMenu) {
      popupMenu.setAttribute('aria-hidden', 'false');
      menuitem.setAttribute('aria-expanded', 'true');
      return this.getMenuId(popupMenu);
    }

    return false;
  }

  closePopout(menuitem) {
    var menu,
      menuId = this.getMenuId(menuitem),
      element = menuitem;

    while (this.isSubMenu[menuId]) {
      menu = this.getMenu(element);
      element = menu.previousElementSibling;
      menuId = this.getMenuId(element);
    }
    element.focus();
    return element;
  }

  closePopup(menuitem) {
    var popupMenu,
      menuId = this.getMenuId(menuitem),
      element = menuitem;

    if (this.isMenubar(menuId)) {
      // We are on top and menu open
      if (this.isOpen(element)) {
        popupMenu = element.nextElementSibling;
        element.setAttribute('aria-expanded', 'false');
        popupMenu.setAttribute('aria-hidden', 'true');
      }
    } else {
      popupMenu = this.getMenu(menuitem);
      element = popupMenu.previousElementSibling;
      element.focus();
      element.setAttribute('aria-expanded', 'false');
      popupMenu.setAttribute('aria-hidden', 'true');
    }

    return element;
  }

  doesNotContain(popup, menuitem) {
    if (menuitem) {
      return !popup.nextElementSibling.contains(menuitem);
    }
    return true;
  }

  closeSubMenuAll(menuitem) {
    if (typeof menuitem !== 'object') {
      menuitem = false;
    }
    for (var i = 0; i < this.hasPopupMenu.length; i++) {
      var popup = this.hasPopupMenu[i];
      if (this.doesNotContain(popup, menuitem)) {
        var popupMenu = popup.nextElementSibling;
        if (popupMenu) {
          popup.setAttribute('aria-expanded', 'false');
          popupMenu.setAttribute('aria-hidden', 'true');
        }
      }
    }
  }

  hasSubMenu(menuitem) {
    return menuitem.getAttribute('aria-haspopup') === 'true';
  }

  isOpen(menuitem) {
    return menuitem.getAttribute('aria-expanded') === 'true';
  }

  isMenubar(menuId) {
    return !this.isSubMenu[menuId];
  }

  isMenuHorizontal(menuitem) {
    return this.menuOrientation[menuitem] === 'horizontal';
  }

  // Menu event handlers

  onKeydown(event) {
    var target = event.currentTarget,
      key = event.key,
      flag = false,
      menuId = this.getMenuId(target),
      id,
      popupMenuId,
      mi;

    switch (key) {
      case ' ':
      case 'Enter':
        if (this.hasSubMenu(target)) {
          if (!this.isOpen(target)) {
            this.closeSubMenuAll(target);
            this.openPopup(target);
            popupMenuId = this.openPopup(target);
            this.setFocusToFirstMenuitem(popupMenuId);
            flag = true;
          } else {
            flag = false;
          }
        } else {

          flag = false;
        }
        break;

      case 'Esc':
      case 'Escape':
        this.closeSubMenuAll(target);
        mi = this.closePopup(target);
        id = this.getMenuId(mi);
        flag = true;
        break;

      case 'Up':
      case 'ArrowUp':
        if (this.isMenuHorizontal(menuId)) {
          if (this.hasSubMenu(target)) {
            popupMenuId = this.openPopup(target);
            this.setFocusToLastMenuitem(popupMenuId);
          }
        } else {
          this.setFocusToPreviousMenuitem(menuId, target);
        }
        flag = true;
        break;

      case 'ArrowDown':
      case 'Down':
        if (this.isMenuHorizontal(menuId)) {
          if (this.hasSubMenu(target)) {
            popupMenuId = this.openPopup(target);
            this.setFocusToFirstMenuitem(popupMenuId);
          }
        } else {
          this.setFocusToNextMenuitem(menuId, target);
        }
        flag = true;
        break;

      case 'Left':
      case 'ArrowLeft':
        if (this.isMenuHorizontal(menuId)) {
          mi = this.setFocusToPreviousMenuitem(menuId, target);
          if (this.isAnyPopupOpen()) {
            this.openPopup(mi);
          }
        } else {
          if (this.isSubMenu[menuId]) {
            this.closeSubMenuAll(target);
            mi = this.closePopup(target);
            flag = true;
          } else {
            mi = this.closePopup(target);
            id = this.getMenuId(mi);
            mi = this.setFocusToPreviousMenuitem(id, mi);
            this.openPopup(id, mi);
          }
        }
        flag = true;
        break;

      case 'Right':
      case 'ArrowRight':
        if (this.isMenuHorizontal(menuId)) {
          mi = this.setFocusToNextMenuitem(menuId, target);
          if (this.isAnyPopupOpen()) {
            this.openPopup(mi);
          }
        } else {
          if (this.hasSubMenu(target)) {
            popupMenuId = this.openPopup(target);
            this.setFocusToFirstMenuitem(popupMenuId);
          } else {
            mi = this.closePopout(target);
            id = this.getMenuId(mi);
            mi = this.setFocusToNextMenuitem(id, mi);
            this.openPopup(id, mi);
          }
        }
        flag = true;
        break;

      case 'Home':
      case 'PageUp':
        this.setFocusToFirstMenuitem(menuId, target);
        flag = true;
        break;

      case 'End':
      case 'PageDown':
        this.setFocusToLastMenuitem(menuId, target);
        flag = true;
        break;

      case 'Tab':
        this.closePopup(target);
        break;

      default:
        if (this.isPrintableCharacter(key)) {
          this.setFocusByFirstCharacter(menuId, target, key);
          flag = true;
        }
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onMenuitemAction(event) {
    var target = event.currentTarget;
    var menuId = this.getMenuId(target);
    var flag = false;

    if (this.hasSubMenu(target)) {
      if (!this.isOpen(target)) {
        this.closeSubMenuAll(target);
        this.openPopup(target);
        event.stopPropagation();
        event.preventDefault();
        flag = true;
      } else {
        this.closeSubMenuAll(target);
        flag = true;
      }
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onBackgroundPointerdown(event) {
    if (!this.domNode.contains(event.target)) {
      this.closeSubMenuAll();
    }
  }
}
