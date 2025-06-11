'use strict';

// Mobile Menu button

function responsiveMenu() {
  const responsiveClass = "responsive";
  var menuElement = document.getElementById("primary-navigation");
  if (menuElement.classList.contains(responsiveClass)) {
    menuElement.classList.remove(responsiveClass);
  } else {
    menuElement.classList.add(responsiveClass);
  }
}
