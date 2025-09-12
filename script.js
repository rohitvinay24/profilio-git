// Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// Set Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth Scroll & Active Links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

window.addEventListener('scroll', () => {
  let fromTop = window.scrollY + 100;
  navLinks.forEach(link => {
    let section = document.querySelector(link.getAttribute('href'));
    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// Gallery Modal
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
document.querySelectorAll(".gallery-item img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
    modalImg.alt = img.alt;
  });
});

function closeModal() {
  modal.style.display = "none";
}
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Filter & Search Projects
function filterProjects(category, event) {
  let items = document.querySelectorAll(".gallery-item");
  let buttons = document.querySelectorAll(".filter-buttons button");
  let searchValue = document.getElementById("searchInput").value.toLowerCase();

  buttons.forEach(btn => btn.classList.remove("active"));
  if (event) event.target.classList.add("active");

  items.forEach(item => {
    let matchesCategory = category === "all" || item.classList.contains(category);
    let matchesSearch = item.querySelector("img").alt.toLowerCase().includes(searchValue);

    if (matchesCategory && matchesSearch) {
      item.style.display = "block";
      setTimeout(() => item.classList.add("show"), 10);
    } else {
      item.classList.remove("show");
      setTimeout(() => item.style.display = "none", 400);
    }
  });
}

document.getElementById("searchInput").addEventListener("input", () => {
  let activeBtn = document.querySelector(".filter-buttons button.active");
  let category = activeBtn ? activeBtn.textContent.toLowerCase().replace(" ", "") : "all";
  filterProjects(category);
});
