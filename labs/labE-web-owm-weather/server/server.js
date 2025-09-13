// Minimal Express proxy for OpenWeatherMap
// - Protects the OWM API key (not exposed to the browser)
// - Resolves place names (Geocoding) then calls One Call 3.0

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const OWM_KEY = process.env.OWM_KEY;
const OWM_BASE = process.env.OWM_BASE || 'https://api.openweathermap.org';

if (!OWM_KEY) {
  // Do not throw to keep dev server running; fail requests with clear error
  console.warn('[WARN] OWM_KEY is not set. Set it in .env before calling the API.');
}

// Health endpoint
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Weather proxy running' });
});

// GET /api/weather?q=City,State,Country&units=metric|imperial&exclude=...&lang=...
app.get('/api/weather', async (req, res) => {
  try {
    if (!OWM_KEY) {
      return res.status(500).json({ error: 'OWM_KEY not configured on server' });
    }

    const q = String(req.query.q || '').trim();
    const units = (req.query.units || '').toString();
    const exclude = (req.query.exclude || '').toString();
    const lang = (req.query.lang || '').toString();

    if (!q) {
      return res.status(400).json({ error: 'Missing required query param: q' });
    }

    const geoUrl = new URL(`${OWM_BASE}/geo/1.0/direct`);
    geoUrl.searchParams.set('q', q);
    geoUrl.searchParams.set('limit', '1');
    geoUrl.searchParams.set('appid', OWM_KEY);

    const geoResp = await fetch(geoUrl, { headers: { 'Accept': 'application/json' } });
    if (!geoResp.ok) {
      return res.status(geoResp.status).json({ error: `Geocoding failed (${geoResp.status})` });
    }
    const geo = await geoResp.json();
    if (!Array.isArray(geo) || geo.length === 0) {
      return res.status(404).json({ error: 'Place not found' });
    }

    const { lat, lon, name, country, state } = geo[0];
    if (typeof lat !== 'number' || typeof lon !== 'number') {
      return res.status(500).json({ error: 'Invalid geocoding response' });
    }

    const oneUrl = new URL(`${OWM_BASE}/data/3.0/onecall`);
    oneUrl.searchParams.set('lat', String(lat));
    oneUrl.searchParams.set('lon', String(lon));
    oneUrl.searchParams.set('appid', OWM_KEY);
    if (units) oneUrl.searchParams.set('units', units);
    if (exclude) oneUrl.searchParams.set('exclude', exclude);
    if (lang) oneUrl.searchParams.set('lang', lang);

    const oneResp = await fetch(oneUrl, { headers: { 'Accept': 'application/json' } });
    if (!oneResp.ok) {
      // Propagate common errors (e.g., 401 during key propagation, 429 limits)
      const text = await oneResp.text();
      return res.status(oneResp.status).type('application/json').send(text);
    }
    const weather = await oneResp.json();

    return res.json({
      location: { name, country, state, lat, lon },
      weather
    });
  } catch (err) {
    console.error('[ERROR] /api/weather', err);
    res.status(500).json({ error: 'Unexpected server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Weather proxy listening on http://localhost:${PORT}`);
});

