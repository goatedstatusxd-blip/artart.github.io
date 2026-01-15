const grid = document.getElementById("projectsGrid");
const about = document.getElementById("aboutSection");
const buttons = document.querySelectorAll(".filters button");
const aboutBtn = document.getElementById("about-btn");

// Render projects
function renderProjects(filter = "all") {
  grid.innerHTML = "";
  grid.classList.remove("hidden");
  about.classList.add("hidden");

  projects
    .filter(p => filter === "all" || p.type === filter)
    .forEach(project => {
      grid.innerHTML += `
        <a class="project-tile fade-in">
          <img src="${project.thumbnail}" alt="${project.title}">
          <div class="project-hover">
            <span>${project.title}</span>
          </div>
        </a>
      `;
    });
}

// Show About Me
function showAbout() {
  grid.classList.add("hidden");
  about.classList.remove("hidden");
}

// Show filter based on name
function showFilter(filter) {
  buttons.forEach(b => b.classList.remove("active"));
  aboutBtn.classList.remove("active");

  if (filter === "about") {
    aboutBtn.classList.add("active");
    showAbout();
  } else if (filter === "all") {
    document.querySelector('[data-filter="all"]').classList.add("active");
    renderProjects("all");
  } else {
    document.querySelector(`[data-filter="${filter}"]`).classList.add("active");
    renderProjects(filter);
  }

  // Update URL hash
  window.history.replaceState(null, '', '#' + filter);
}

// Event listeners
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    showFilter(btn.dataset.filter);
  });
});

aboutBtn.addEventListener("click", () => {
  showFilter("about");
});

// On page load, check URL hash
window.addEventListener("load", () => {
  const hash = window.location.hash.replace('#','');
  if(hash) {
    showFilter(hash);
  } else {
    showFilter("all");
  }
});
