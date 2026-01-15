const grid = document.getElementById("projectsGrid");
const about = document.getElementById("aboutSection");
const buttons = document.querySelectorAll(".filters button");
const aboutBtn = document.getElementById("about-btn");

// MODAL ELEMENTS
const modal = document.getElementById("projectModal");
const modalMain = document.getElementById("modal-main-media");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalGallery = document.getElementById("modal-gallery");
const modalClose = document.querySelector(".modal-close");

// OPEN MODAL
function openProjectModal(project) {
  modal.classList.remove("fade-out");
  modal.classList.add("show", "fade-in");

  // Main media
  if (project.link.includes("youtube") || project.link.includes("drive")) {
    modalMain.innerHTML = `<iframe src="${project.link}" frameborder="0" allowfullscreen></iframe>`;
  } else {
    modalMain.innerHTML = `<img src="${project.link}" alt="${project.title}">`;
  }

  // Title & Description
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;

  // Gallery
  modalGallery.innerHTML = "";
  project.gallery.forEach((item, index) => {
    const thumb = document.createElement("img");
    thumb.src = item;
    if (index === 0) thumb.classList.add("active");
    thumb.addEventListener("click", () => {
      modalGallery.querySelectorAll("img").forEach(img => img.classList.remove("active"));
      thumb.classList.add("active");
      if (item.includes("youtube") || item.includes("drive")) {
        modalMain.innerHTML = `<iframe src="${item}" frameborder="0" allowfullscreen></iframe>`;
      } else {
        modalMain.innerHTML = `<img src="${item}" alt="${project.title}">`;
      }
    });
    modalGallery.appendChild(thumb);
  });
}

// CLOSE MODAL
function closeModal() {
  modal.classList.remove("fade-in");
  modal.classList.add("fade-out");
  setTimeout(() => {
    modal.classList.remove("show", "fade-out");
  }, 300);
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if(e.target === modal) closeModal(); });

// ATTACH CLICK TO PROJECTS
function attachProjectClick() {
  document.querySelectorAll(".project-tile").forEach((tile, index) => {
    tile.addEventListener("click", (e) => {
      e.preventDefault();
      openProjectModal(projects[index]);
    });
  });
}

// RENDER PROJECTS
function renderProjects(filter = "all") {
  grid.innerHTML = "";
  grid.classList.remove("hidden");
  about.classList.add("hidden");

  const filtered = projects.filter(p => filter === "all" || p.type === filter);
  filtered.forEach(project => {
    grid.innerHTML += `
      <a class="project-tile fade-in" href="${project.link}">
        <img src="${project.thumbnail}" alt="${project.title}">
        <div class="project-hover">
          <span>${project.title}</span>
        </div>
      </a>
    `;
  });

  attachProjectClick();
}

// FILTERS + ABOUT ME
function showFilter(filter) {
  buttons.forEach(b => b.classList.remove("active"));
  aboutBtn.classList.remove("active");

  if (filter === "about") {
    aboutBtn.classList.add("active");
    grid.classList.add("hidden");
    about.classList.remove("hidden");
  } else {
    const btn = document.querySelector(`[data-filter="${filter}"]`);
    if(btn) btn.classList.add("active");
    renderProjects(filter);
  }

  window.history.replaceState(null, '', '#' + filter);
}

buttons.forEach(btn => btn.addEventListener("click", () => showFilter(btn.dataset.filter)));
aboutBtn.addEventListener("click", () => showFilter("about"));

// LOAD ON PAGE LOAD
window.addEventListener("load", () => {
  const hash = window.location.hash.replace('#','');
  if(hash) showFilter(hash);
  else showFilter("all");
});
