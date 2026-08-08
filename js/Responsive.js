// mobile nav toggle - shows/hides the nav links when the hamburger is clicked
const toggleButton = document.querySelector(".toggle-btn");
const navBar = document.querySelector("nav.container");

if (toggleButton && navBar) {
  toggleButton.addEventListener("click", function (e) {
    e.preventDefault();
    navBar.classList.toggle("active");
  });
}
