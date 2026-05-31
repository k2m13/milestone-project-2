const navLinks = document.querySelectorAll(".nav-link");
const screens = document.querySelectorAll(".screen");

console.log(navLinks);
console.log(screens);

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        console.log(link.textContent);
    const screenId = link.getAttribute("href");
        console.log(screenId);
    });
});

