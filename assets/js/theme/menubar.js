/*
 *  This software or document includes material copied from or derived from the
 *  Navigation Menubar Example [1] from ARIA Authoring Practices Guide (APG) [2]
 *  and is licensed according to the W3C Software License [3].
 *  [1] https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-navigation/
 *  [2] https://www.w3.org/copyright/software-license/
 */

'use strict';

class MenubarNavigation {
  constructor({element: domNode}) {
    this.domNode = domNode;

    this.menuitems = [];
    this.popups = [];
    this.topPopups = [];
    this.menuitemGroups = {};
    this.menuOrientation = {};
    this.isPopup = {};
    this.isPopout = {};
    this.openPopups = false;

    this.firstChars = {}; // see Menubar init method
    this.firstMenuitem = {}; // see Menubar init method
    this.lastMenuitem = {}; // see Menubar init method

    this.initMenu(domNode, 0);

    window.addEventListener(
      'pointerdown',
      this.onBackgroundPointerdown.bind(this),
      true
    );

    domNode.querySelector('[role=menuitem]').tabIndex = 0;
  }

  getParentMenuitem(menuitem) {
    var node = menuitem.parentNode;
    if (node) {
      node = node.parentNode;
      if (node) {
        node = node.previousElementSibling;
        if (node) {
          if (node.getAttribute('role') === 'menuitem') {
            return node;
          }
        }
      }
    }
    return false;
  }

  getMenuitems(domNode, depth) {
    var nodes = [];

    var initMenu = this.initMenu.bind(this);
    var popups = this.popups;
    var topPopups = this.topPopups;

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
            node.tabIndex = -1;
            initMenu(node, depth + 1);
            flag = false;
            break;

          case 'menuitem':
            if (node.getAttribute('aria-haspopup') === 'true') {
              popups.push(node);
              if (depth === 0) {
                topPopups.push(node)
              }
            }
            nodes.push(node);
            break;

          default:
            break;
        }

        if (
          flag &&
          node.firstElementChild &&
          node.firstElementChild.tagName !== 'svg'
        ) {
          findMenuitems(node.firstElementChild);
        }
        node = node.nextElementSibling;
      }
    }
    findMenuitems(domNode.firstElementChild);
    return nodes;
  }

  initMenu(menu, depth) {
    var menuitems, menuitem, role;

    var menuId = this.getMenuId(menu);

    menuitems = this.getMenuitems(menu, depth);
    this.menuOrientation[menuId] = this.getMenuOrientation(menu);

    this.isPopup[menuId] = menu.getAttribute('role') === 'menu' && depth === 0;
    this.isPopout[menuId] = menu.getAttribute('role') === 'menu' && depth > 0;

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
        if (this.hasPopup(menuitem)) {
          menuitem.tabIndex = 0;
        }
        this.firstMenuitem[menuId] = menuitem;
      }
      this.lastMenuitem[menuId] = menuitem;
    }
  }

  setFocusToMenuitem(menuId, newMenuitem) {
    this.closePopupAll(newMenuitem);

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

  getIdFromAriaLabel(node) {
    var id = node.getAttribute('aria-label');
    if (id) {
      id = id.trim().toLowerCase().replace(' ', '-').replace('/', '-');
    }
    return id;
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

  getMenuId(node) {
    var id = false;
    var role = node.getAttribute('role');

    while (node && role !== 'menu' && role !== 'menubar') {
      node = node.parentNode;
      if (node) {
        role = node.getAttribute('role');
      }
    }

    if (node) {
      id = role + '-' + this.getIdFromAriaLabel(node);
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
    for (var i = 0; i < this.popups.length; i++) {
      if (this.popups[i].getAttribute('aria-expanded') === 'true') {
        return true;
      }
    }
    return false;
  }

  openPopup(menuId, menuitem) {
    // set sub-menu as visible
    var popupMenu = menuitem.nextElementSibling;

    if (popupMenu) {
      var rect = menuitem.getBoundingClientRect();

      // Set CSS properties
      if (this.isPopout[menuId]) {
        // popupMenu.style.display = 'contents';
        popupMenu.classList.add('sub-menu');
      }

      // if (this.isPopout[menuId]) {
      //   menuElement.classList.add('sub-menu');
      // } else {
      //   popupMenu.style.left = rect.left;
      //   menuElement.classList.add('top-menu');
      // }

      popupMenu.style.zIndex = 100;
      // popupMenu.style.position = 'absolute';
      popupMenu.setAttribute('aria-hidden', 'false');

      menuitem.setAttribute('aria-expanded', 'true');
      return this.getMenuId(popupMenu);
    }

    return false;
  }

  closePopout(menuitem) {
    var menu,
      menuId = this.getMenuId(menuitem),
      cmi = menuitem;

    while (this.isPopup[menuId] || this.isPopout[menuId]) {
      menu = this.getMenu(cmi);
      cmi = menu.previousElementSibling;
      menuId = this.getMenuId(cmi);
    }
    cmi.focus();
    return cmi;
  }

  closePopup(menuitem) {
    var popupMenu,
      menuId = this.getMenuId(menuitem),
      cmi = menuitem;

    if (this.isMenubar(menuId)) {
      if (this.isOpen(cmi)) {
        // We are on top and menu open
        popupMenu = cmi.nextElementSibling;
        cmi.setAttribute('aria-expanded', 'false');
        popupMenu.setAttribute('aria-hidden', 'true');
      } else {
        // We are on top and no menu open
      }
    } else {
      popupMenu = this.getMenu(menuitem);
      cmi = popupMenu.previousElementSibling;
      cmi.focus();
      cmi.setAttribute('aria-expanded', 'false');
      popupMenu.setAttribute('aria-hidden', 'true');
    }

    return cmi;
  }

  doesNotContain(popup, menuitem) {
    if (menuitem) {
      return !popup.nextElementSibling.contains(menuitem);
    }
    return true;
  }

  closePopupAll(menuitem) {
    if (typeof menuitem !== 'object') {
      menuitem = false;
    }
    for (var i = 0; i < this.popups.length; i++) {
      var popup = this.popups[i];
      if (this.doesNotContain(popup, menuitem)) {
        var popupMenu = popup.nextElementSibling;
        if (popupMenu) {
          popup.setAttribute('aria-expanded', 'false');
          popupMenu.setAttribute('aria-hidden', 'true');
        }
      }
    }
  }

  hasPopup(menuitem) {
    return menuitem.getAttribute('aria-haspopup') === 'true';
  }

  isOpen(menuitem) {
    return menuitem.getAttribute('aria-expanded') === 'true';
  }

  isMenubar(menuId) {
    return !this.isPopup[menuId] && !this.isPopout[menuId];
  }

  isMenuHorizontal(menuitem) {
    return this.menuOrientation[menuitem] === 'horizontal';
  }

  // Menu event handlers

  onKeydown(event) {
    var tgt = event.currentTarget,
      key = event.key,
      flag = false,
      menuId = this.getMenuId(tgt),
      id,
      popupMenuId,
      mi;

    switch (key) {
      case ' ':
      case 'Enter':
        if (this.hasPopup(tgt)) {
          if (!this.isOpen(tgt)) {
            this.openPopups = true;
            this.closePopupAll(tgt);
            this.openPopup(menuId, tgt);
            popupMenuId = this.openPopup(menuId, tgt);
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
        this.openPopups = false;
        this.closePopupAll(tgt);
        mi = this.closePopup(tgt);
        id = this.getMenuId(mi);
        flag = true;
        break;

      case 'Up':
      case 'ArrowUp':
        if (this.isMenuHorizontal(menuId)) {
          if (this.hasPopup(tgt)) {
            this.openPopups = true;
            popupMenuId = this.openPopup(menuId, tgt);
            this.setFocusToLastMenuitem(popupMenuId);
          }
        } else {
          this.setFocusToPreviousMenuitem(menuId, tgt);
        }
        flag = true;
        break;

      case 'ArrowDown':
      case 'Down':
        if (this.isMenuHorizontal(menuId)) {
          if (this.hasPopup(tgt)) {
            this.openPopups = true;
            popupMenuId = this.openPopup(menuId, tgt);
            this.setFocusToFirstMenuitem(popupMenuId);
          }
        } else {
          this.setFocusToNextMenuitem(menuId, tgt);
        }
        flag = true;
        break;

      case 'Left':
      case 'ArrowLeft':
        if (this.isMenuHorizontal(menuId)) {
          mi = this.setFocusToPreviousMenuitem(menuId, tgt);
          if (this.isAnyPopupOpen()) {
            this.openPopup(menuId, mi);
          }
        } else {
          if (this.isPopout[menuId]) {
            mi = this.closePopout(tgt);
            id = this.getMenuId(mi);
            mi = this.setFocusToMenuitem(id, mi);
          } else {
            mi = this.closePopup(tgt);
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
          mi = this.setFocusToNextMenuitem(menuId, tgt);
          if (this.isAnyPopupOpen()) {
            this.openPopup(menuId, mi);
          }
        } else {
          if (this.hasPopup(tgt)) {
            popupMenuId = this.openPopup(menuId, tgt);
            this.setFocusToFirstMenuitem(popupMenuId);
          } else {
            mi = this.closePopout(tgt);
            id = this.getMenuId(mi);
            mi = this.setFocusToNextMenuitem(id, mi);
            this.openPopup(id, mi);
          }
        }
        flag = true;
        break;

      case 'Home':
      case 'PageUp':
        this.setFocusToFirstMenuitem(menuId, tgt);
        flag = true;
        break;

      case 'End':
      case 'PageDown':
        this.setFocusToLastMenuitem(menuId, tgt);
        flag = true;
        break;

      case 'Tab':
        this.openPopups = false;
        this.closePopup(tgt);
        break;

      default:
        if (this.isPrintableCharacter(key)) {
          this.setFocusByFirstCharacter(menuId, tgt, key);
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
    var tgt = event.currentTarget;
    var menuId = this.getMenuId(tgt);
    var flag = false;

    if (this.hasPopup(tgt)) {
      // On first click, open menu
      if (!this.isOpen(tgt)) {
        this.closePopupAll(tgt);
        this.openPopup(menuId, tgt);
        event.stopPropagation();
        event.preventDefault();
        flag = true;
      }
    }
  }

  onBackgroundPointerdown(event) {
    if (!this.domNode.contains(event.target)) {
      this.closePopupAll();
    }
  }
}

// Initialize menubar editor

window.addEventListener('load', function () {
  var menubarNavs = document.querySelectorAll('ul[role="menubar"]');
  for (var i = 0; i < menubarNavs.length; i++) {
    new MenubarNavigation({element: menubarNavs[i]});
  }
});
