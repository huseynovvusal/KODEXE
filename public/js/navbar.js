const nav_list = document.querySelector("nav ul");
const nav_button = document.querySelector(".nav-button");

nav_button.addEventListener("click", (e) => {
  nav_list.classList.toggle("active");
});
