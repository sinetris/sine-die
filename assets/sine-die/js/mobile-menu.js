'use strict';

// Mobile Menu button

class MobileMenu {
  #button;
  #openLabel;
  #closeLabel;
  constructor(button, openLabel = 'Open main menu', closeLabel = 'Close main menu') {
    this.#button = button;
    this.#openLabel = openLabel;
    this.#closeLabel = closeLabel;
    this.#button.addEventListener("click", this.switchMenu.bind(this));
    this.updateMenu(this.isExpanded);
  }

  get isExpanded() {
    return this.#button.getAttribute("aria-expanded") === 'true';
  }

  updateMenu(expanded) {
    let label = expanded ? this.#closeLabel : this.#openLabel;
    this.#button.setAttribute("aria-label", label);
    this.#button.setAttribute("aria-expanded", expanded.toString());
  }

  switchMenu() {
    const primaryMenu = this.#button.parentNode;
    let toggleExpanded = !(this.isExpanded);
    this.updateMenu(toggleExpanded);
  }
}
