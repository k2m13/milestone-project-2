const navLinks = document.querySelectorAll(".nav-link");
const screens = document.querySelectorAll(".screen");

console.log(navLinks);
console.log(screens);

// Log nav links and screen id's to the console
navLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    console.log(link.textContent);

    const screenId = link.getAttribute("href");
    console.log(screenId);
    screens.forEach(function (screen) {
      screen.classList.remove("active-screen");
    });
    const targetScreen = document.querySelector(screenId);
    targetScreen.classList.add("active-screen");

    navLinks.forEach(function (navLink) {
      navLink.classList.remove("nav-link--active");
    });
    link.classList.add("nav-link--active");
  });
});
