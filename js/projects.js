const projects = [
  {
    title: "Kur Sea Vai",
    type: "video",
    thumbnail: "assets/images/kur sea vai/kadrai1.png",
    link: "https://www.youtube.com/embed/ol1oq-GpWec",
    description: "Short film directed by Aura Vilkisiute.",
    gallery: [
      "assets/images/kur sea vai/kadrai1.png",
      "assets/images/kur sea vai/kadrai2.png",
      "assets/images/kur sea vai/kadrai3.png"
    ]
  },
  {
    title: "Radio",
    type: "video",
    thumbnail: "assets/images/radio/radio1.png",
    link: "https://drive.google.com/file/d/1EPTAeF77ZEEp9xZeQ5n1I69FFpjbLRLr/preview",
    description: "Experimental video project.",
    gallery: [
      "assets/images/radio/radio1.png",
      "assets/images/radio/radio2.png",
      "assets/images/radio/radio3.png"
    ]
  },
  {
    title: "Laukiniai",
    type: "photo",
    thumbnail: "assets/images/laukiniai/laukiniai1.png",
    link: "assets/images/laukiniai/laukiniai1.png",
    description: "Photography series.",
    gallery: [
      "assets/images/laukiniai/laukiniai1.png",
      "assets/images/laukiniai/laukiniai2.png",
      "assets/images/laukiniai/laukiniai3.png"
    ]
  },
  {
    title: "Antradienis",
    type: "photo",
    thumbnail: "assets/images/antradienis/antradienis1.png",
    link: "assets/images/antradienis/antradienis1.png",
    description: "Photography series.",
    gallery: [
      "assets/images/antradienis/antradienis1.png",
      "assets/images/antradienis/antradienis2.png",
      "assets/images/antradienis/antradienis3.png"
    ]
  }
];

const projectsContainer = document.getElementById("projects");
const dropdown = document.getElementById("portfolioDropdown");

const projectModal = document.getElementById("projectModal");
const imageModal = document.getElementById("imageModal");

const titleEl = document.getElementById("projectTitle");
const descEl = document.getElementById("projectDescription");
const mainEl = document.getElementById("projectMain");
const galleryEl = document.getElementById("projectGallery");
const imageModalImg = document.getElementById("imageModalImg");

/* GRID + DROPDOWN */
projects.forEach(project => {
  // Grid
  const div = document.createElement("div");
  div.className = "project";
  div.innerHTML = `<img src="${project.thumbnail}" alt="${project.title}">`;
  div.onclick = () => openProject(project);
  projectsContainer.appendChild(div);

  // Dropdown
  const li = document.createElement("li");
  li.textContent = project.title;
  li.onclick = () => openProject(project);
  dropdown.appendChild(li);
});

/* OPEN PROJECT */
function openProject(project) {
  projectModal.style.display = "block";

  titleEl.textContent = project.title;
  descEl.textContent = project.description;

  mainEl.innerHTML = "";
  galleryEl.innerHTML = "";

  if (project.type === "video") {
    const iframe = document.createElement("iframe");
    iframe.src = project.link;
    iframe.allowFullscreen = true;
    iframe.height = 450;
    mainEl.appendChild(iframe);
  } else {
    const img = document.createElement("img");
    img.src = project.link;
    mainEl.appendChild(img);
  }

  project.gallery.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.onclick = () => openImage(src);
    galleryEl.appendChild(img);
  });
}

/* IMAGE MODAL */
function openImage(src) {
  imageModal.style.display = "flex";
  imageModalImg.src = src;
}

/* CLOSE */
document.getElementById("closeProject").onclick = () => {
  projectModal.style.display = "none";
};

document.getElementById("closeImage").onclick = () => {
  imageModal.style.display = "none";
};
