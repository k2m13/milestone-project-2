const navLinks = document.querySelectorAll(".nav-link");
const screens = document.querySelectorAll(".screen");

console.log(navLinks);
console.log(screens);

// Log nav links and screen id's to the console
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    console.log(link.textContent);
    const screenId = link.getAttribute("href");
    console.log(screenId);
  });
});

// Stop the page jumping
link.addEventListener("click", function (event) {
  event.preventDefault();
  const screenId = link.getAttribute("href");
  console.log(screenId);
});
