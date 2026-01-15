const grid = document.getElementById("projectsGrid");
const about = document.getElementById("aboutSection");
const buttons = document.querySelectorAll(".filters button");

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

function showAbout() {
  grid.classList.add("hidden");
  about.classList.remove("hidden");
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    if (filter === "about") {
      showAbout();
    } else {
      renderProjects(filter);
    }
  });
});

renderProjects("all");
