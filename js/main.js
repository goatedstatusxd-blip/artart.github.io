<script>
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-tile');
const aboutSection = document.querySelector('.about-container');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active from all buttons
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    if (filter === 'about') {
      // Show About, hide projects
      aboutSection.classList.remove('hidden');
      projects.forEach(p => p.classList.add('hidden'));
    } else if (filter === 'all') {
      aboutSection.classList.add('hidden');
      projects.forEach(p => p.classList.remove('hidden'));
    } else {
      // Show only projects in this category
      aboutSection.classList.add('hidden');
      projects.forEach(p => {
        if (p.dataset.category === filter) {
          p.classList.remove('hidden');
        } else {
          p.classList.add('hidden');
        }
      });
    }
  });
});
</script>
