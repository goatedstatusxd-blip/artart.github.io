const grid = document.getElementById("projectsGrid");
const about = document.getElementById("aboutSection");
const buttons = document.querySelectorAll(".filters button");
const aboutBtn = document.getElementById("about-btn");

// Function to fade out an element
function fadeOut(element, callback) {
  element.style.opacity = 1;
  element.style.transition = "opacity 0.3s ease";
  element.style.opacity = 0;

  setTimeout(() => {
    if (callback) callback();
  }, 300);
}

// Function to fade in an element
function fadeIn(element) {
  element.style.opacity = 0;
  element.classList.remove("hidden");
  element.style.transition = "opacity 0.3s ease";
  requestAnimationFrame(() => {
    element.style.opacity = 1;
  });
}

// Render projects dynamically
function renderProjects(filter = "all") {
  grid.innerHTML = "";
  projects
    .filter(p => filter === "all" || p.type === filter)
    .forEach(project => {
      grid.innerHTML += `
        <a class="project-tile fade-in" href="${project.link}" target="_blank">
          <img src="${project.thumbnail}" alt="${project.title}">
          <div class="project-hover">
            <span>${project.title}</span>
          </div>
        </a>
      `;
    });
}

// Show About section
function showAbout() {
  about.classList.remove("hidden");
}

// Show filter with smooth transitions
function showFilter(filter) {
  // Remove active class from all
  buttons.forEach(b => b.classList.remove("active"));
  aboutBtn.classList.remove("active");

  // Apply active class
  if (filter === "about") {
    aboutBtn.classList.add("active");
  } else {
    const btn = document.querySelector(`[data-filter="${filter}"]`);
    if(btn) btn.classList.add("active");
  }

  // Fade out current content first
  const visible = !grid.classList.contains("hidden") ? grid : about;
  fadeOut(visible, () => {
    // Hide both initially
    grid.classList.add("hidden");
    about.classList.add("hidden");

    // Show the selected section
    if (filter === "about") {
      showAbout();
      fadeIn(about);
    } else {
      renderProjects(filter);
      fadeIn(grid);
    }
  });

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
