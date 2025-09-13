# OpenWeatherMap One Call 3.0 + Geocoding: Quick Guide

This cheat‑sheet summarizes how to use OpenWeatherMap (OWM) One Call 3.0 and pair it with the Geocoding API to resolve place names to coordinates. It includes endpoints, core parameters, response structure, examples, and practical tips.

> Note: Pricing, quotas, and availability can change. Always verify on the official OWM docs and pricing pages before production use.

## What One Call 3.0 Provides

- Unified weather by coordinates: current conditions, minute‑by‑minute nowcast, hourly, daily, and weather alerts in one response.
- Historical and specific‑timestamp data via Time Machine.
- Daily aggregated summaries and a short human‑readable overview.

## Endpoints (Data 3.0)

- Current + forecast bundle
  - `GET https://api.openweathermap.org/data/3.0/onecall`
  - Returns: `current`, `minutely` (1h), `hourly` (up to ~48h), `daily` (up to ~8 days), `alerts` (where available).

- Historical / specific timestamp
  - `GET https://api.openweathermap.org/data/3.0/onecall/timemachine`
  - Params include `dt` (Unix UTC seconds) for the desired timestamp.

- Daily aggregation (summary for a calendar day)
  - `GET https://api.openweathermap.org/data/3.0/onecall/day_summary`
  - Params include `date=YYYY-MM-DD` and optional `tz=±HH:MM`.

- Weather overview (concise narrative)
  - `GET https://api.openweathermap.org/data/3.0/onecall/overview`

## Core Request Parameters

- Required for most One Call endpoints: `lat`, `lon`, `appid` (your API key).
- Optional filters/toggles:
  - `exclude` — comma‑separated blocks to omit: `current,minutely,hourly,daily,alerts`.
  - `units` — `standard` (Kelvin), `metric` (C, m/s), `imperial` (F, mph).
  - `lang` — localization (e.g., `en`, `es`, `fr`, `de`, `pt`, etc.).
  - Endpoint‑specific: `dt` (Time Machine), `date` and `tz` (Day Summary), etc.

## Response Structure (high level)

- `current` — time, temperature, `feels_like`, pressure, humidity, dew point, clouds, visibility, wind (`speed`, `deg`, optional `gust`), precipitation (if any), UV index (`uvi`), and a `weather[]` array with condition codes and text.
- `minutely[]` — 60 points of per‑minute precipitation intensity (where available).
- `hourly[]` — per‑hour temps, `feels_like`, precipitation, clouds, wind, `pop` (probability of precipitation), and `weather[]`.
- `daily[]` — daily aggregates (`temp` with `min/max/morn/day/eve/night`, `feels_like`, precipitation totals, cloud cover, wind, `uvi`, `weather[]`).
- `alerts[]` — provider name, event, start/end (Unix), description, and tags (where provided by national services).

## Pairing With the Geocoding API

Use Geocoding to translate user input (city, state, country, ZIP/postcode) into coordinates, then pass those `lat`/`lon` to One Call.

Geocoding endpoints (Geo 1.0):

- Direct (name ➜ coords):
  - `GET https://api.openweathermap.org/geo/1.0/direct?q={city}[,{state code},{country code}]&limit={n}&appid={API_KEY}`

- ZIP/postcode (ZIP ➜ coords):
  - `GET https://api.openweathermap.org/geo/1.0/zip?zip={zip},{country code}&appid={API_KEY}`

- Reverse (coords ➜ nearest place name):
  - `GET https://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={n}&appid={API_KEY}`

Best practices:

- Disambiguate by including country (ISO 3166‑1 alpha‑2), and for US places, add state: `q=Portland,OR,US`.
- Use `limit=1` when you expect a single match; otherwise present top results to users.
- Cache geocoding results; cities’ coordinates rarely change.
- Use reverse geocoding to display a friendly name with your weather output.

## Example Flows

### cURL: Name ➜ Coords ➜ One Call

```bash
# 1) Resolve a name to coordinates
curl -s "https://api.openweathermap.org/geo/1.0/direct?q=Portland,OR,US&limit=1&appid=$OWM_KEY" \
  | jq '.[0] | {name, country, lat, lon}'

# Suppose it returns lat=45.523, lon=-122.676

# 2) Fetch weather using One Call 3.0
curl -s "https://api.openweathermap.org/data/3.0/onecall?lat=45.523&lon=-122.676&units=imperial&exclude=minutely&appid=$OWM_KEY" \
  | jq '{current: {temp, weather: .weather[0].description}, hourly: (.hourly[:3] | map({dt, temp}))}'
```

### JavaScript (fetch)

```js
const key = process.env.OWM_KEY;
const q = 'Paris,FR';

const g = await fetch(
  `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=1&appid=${key}`
).then(r => r.json());

if (!g.length) throw new Error('Place not found');

const { lat, lon, name, country } = g[0];
const wx = await fetch(
  `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${key}`
).then(r => r.json());

console.log(`${name}, ${country}:`, wx.current.temp, '°C');
```

### Python (requests)

```python
import os, requests

KEY = os.environ['OWM_KEY']
q = 'Denver,CO,US'

geo = requests.get(
    'https://api.openweathermap.org/geo/1.0/direct',
    params={'q': q, 'limit': 1, 'appid': KEY},
    timeout=15
).json()

if not geo:
    raise SystemExit('Place not found')

lat, lon = geo[0]['lat'], geo[0]['lon']
wx = requests.get(
    'https://api.openweathermap.org/data/3.0/onecall',
    params={'lat': lat, 'lon': lon, 'units': 'imperial', 'exclude': 'minutely', 'appid': KEY},
    timeout=15
).json()

print('Current temp (F):', wx['current']['temp'])
```

## Error Handling & Limits

- Expect standard HTTP codes: `400` invalid request, `401` unauthorized (bad/missing key), `404` not found, `429` rate limit exceeded, and `5xx` server‑side.
- Typical error body: `{ "cod": <code>, "message": <string>, "parameters": [...] }`.
- Use exponential backoff on `429`/`5xx`; retry safely idempotent reads.
- Reduce payload and cost by excluding blocks you don’t need via `exclude`.

## Migration Notes

- One Call 2.5 is deprecated/sunset; prefer One Call 3.0 endpoints and parameters.

## Security & Operational Tips

- Keep your API key secret. Load from environment (e.g., `OWM_KEY`) instead of hard‑coding.
- Validate and clamp user input for city/ZIP to avoid abuse.
- Log raw responses in development, but avoid logging secrets.
- Cache geocoding results and short‑term weather responses to control quota usage and latency.
- New API keys can take 30 minutes or more to propagate before they are recognized by the API servers for programmatic calls; during this window you may receive `401 Unauthorized` even though the key appears active in the dashboard.

## Official Docs & References

- One Call 3.0 docs: https://openweathermap.org/api/one-call-3
- Geocoding API docs: https://openweathermap.org/api/geocoding-api
- Pricing: https://openweathermap.org/price
- Troubleshooting & edge cases: see the official docs above; note that new API keys may take 30–60 minutes to activate for programmatic calls.

---

If you want, we can add a small CLI (Node or Python) that accepts a city or ZIP, resolves coordinates, and prints current conditions from One Call 3.0.
