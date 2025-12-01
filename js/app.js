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

    // kick off forecast load (only on page load)
    loadFourDayForecast();
});

// Keep this file lean — real map & weather integrations should be loaded lazily
// NOTE: When integrating weather APIs, prefer metric units by default:
// - Temperature: degrees Celsius (°C)
// - Distance / wind speed: kilometers (km) / km/h
// This keeps the app consistent for the target audience and avoids mixing metric and non-metric units.

  /* -------------- Weather: NEA 4-day forecast (data.gov.sg) -------------- */
  async function loadFourDayForecast() {
    const container = document.getElementById('forecastContainer');
    if (!container) return;

    const loading = container.querySelector('.forecast-loading');
    try {
      const resp = await fetch('https://api.data.gov.sg/v1/environment/4-day-weather-forecast');
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const json = await resp.json();
      const forecasts = (json.items && json.items[0] && json.items[0].forecasts) || [];

      container.innerHTML = '';
      if (!forecasts.length) {
        container.innerHTML = '<div class="forecast-loading">No forecast available</div>';
        return;
      }

      // Helper for simple icons
      const iconFor = (text) => {
        const t = (text || '').toLowerCase();
        if (t.includes('thund') || t.includes('thunder')) return '⛈️';
        if (t.includes('shower') || t.includes('rain')) return '🌧️';
        if (t.includes('cloud')) return '☁️';
        if (t.includes('sun') || t.includes('clear') || t.includes('hot')) return '☀️';
        return '🌤️';
      };

      forecasts.forEach(day => {
        const card = document.createElement('div');
        card.className = 'forecast-card';

        const dt = new Date(day.date);
        const dateStr = dt.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

        const icon = iconFor(day.forecast);
        const tempLow = day.temperature && day.temperature.low != null ? `${day.temperature.low}°C` : '—';
        const tempHigh = day.temperature && day.temperature.high != null ? `${day.temperature.high}°C` : '—';
        const windLow = day.wind && day.wind.speed && day.wind.speed.low != null ? `${day.wind.speed.low} km/h` : '—';
        const windHigh = day.wind && day.wind.speed && day.wind.speed.high != null ? `${day.wind.speed.high} km/h` : '—';
        const humidity = day.relative_humidity && typeof day.relative_humidity.low !== 'undefined' ? `${day.relative_humidity.low}%–${day.relative_humidity.high}%` : '—';

        card.innerHTML = `
          <div class="date">${dateStr}</div>
          <div class="summary">${icon} ${escapeHtml(day.forecast || 'Forecast')}</div>
          <div class="temp">${tempLow} — ${tempHigh}</div>
          <div class="extra">Wind: ${windLow} — ${windHigh} • Humidity: ${humidity}</div>
        `;

        container.appendChild(card);
      });

    } catch (err) {
      console.error('Forecast error', err);
      if (container) container.innerHTML = '<div class="forecast-loading">Could not load forecast — try again later</div>';
    } finally {
      if (loading && loading.parentNode) loading.remove();
    }
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
// and initialized only when the user needs them to keep first load fast.
