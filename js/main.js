<script>
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-tile');
const aboutSection = document.querySelector('.about-container');

function showFilter(filter) {
  // Remove active class
  filterButtons.forEach(btn => btn.classList.remove('active'));

  if(filter === 'about') {
    document.querySelector('#about-btn').classList.add('active');
    aboutSection.classList.remove('hidden');
    projects.forEach(p => p.classList.add('hidden'));
  } else if(filter === 'all') {
    document.querySelector('[data-filter="all"]').classList.add('active');
    aboutSection.classList.add('hidden');
    projects.forEach(p => p.classList.remove('hidden'));
  } else {
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    aboutSection.classList.add('hidden');
    projects.forEach(p => {
      if(p.dataset.category === filter) p.classList.remove('hidden');
      else p.classList.add('hidden');
    });
  }

  // Update URL hash without reloading
  window.history.replaceState(null, '', '#' + filter);
}

// Add event listeners
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter || (btn.id === 'about-btn' ? 'about' : 'all');
    showFilter(filter);
  });
});

// On page load, check URL hash
window.addEventListener('load', () => {
  const hash = window.location.hash.replace('#','');
  if(hash) {
    showFilter(hash);
  } else {
    showFilter('all');
  }
});
</script>
