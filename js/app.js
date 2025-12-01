// ShoreSquad starter JS
document.addEventListener('DOMContentLoaded', () => {
  // small utility to set current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // menu toggle for small screens
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.getElementById('nav-list');
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      navList.style.display = expanded ? 'none' : 'flex';
    });
  }

  // simple form handler (local-only demo)
  const joinForm = document.getElementById('joinForm');
  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('name') || {}).value || 'friend';
      // Basic in-page feedback (no backend in starter)
      alert(`Thanks, ${name}! We'll save your spot.`);
      joinForm.reset();
    });
  }

  // placeholder CTA handlers
  const createEvent = document.getElementById('create-event');
  const exploreMap = document.getElementById('explore-map');
  if (createEvent) createEvent.addEventListener('click', () => alert('Create event — work in progress'));
  if (exploreMap) exploreMap.addEventListener('click', () => alert('Map — integration coming soon'));
});

// Keep this file lean — real map & weather integrations should be loaded lazily
// NOTE: When integrating weather APIs, prefer metric units by default:
// - Temperature: degrees Celsius (°C)
// - Distance / wind speed: kilometers (km) / km/h
// This keeps the app consistent for the target audience and avoids mixing metric and non-metric units.
// and initialized only when the user needs them to keep first load fast.
