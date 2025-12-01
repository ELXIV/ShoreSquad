# ShoreSquad — Starter site

ShoreSquad is a small starter site and PWA-friendly prototype for a community-first beach cleanup app. The project provides a minimal HTML/CSS/JS scaffold and is intended to be iterated on with real map and weather integrations.

Quick start
1. Open this folder in VS Code
2. Use the Live Server extension or run a small static server

```powershell
cd shore_squad
npx http-server -p 5502
```

Files
- `index.html` — main landing page
- `css/styles.css` — simple responsive layout
- `js/app.js` — minimal interactivity
- `manifest.json` — basic web app manifest
- `sw.js` — tiny service worker starter (demo only)

Next steps
- Add a real map (Leaflet / Mapbox), lazy-load it
- Integrate a weather API for event planning
- Add backend (Supabase / Netlify Functions) to persist events and attendees
