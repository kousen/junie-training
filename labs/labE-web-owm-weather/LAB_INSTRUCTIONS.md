# Lab E: Weather App with OpenWeatherMap (JS/TS)

## Duration: 30–45 minutes

## Learning Objectives
- Resolve place names with the OWM Geocoding API and fetch weather via One Call 3.0.
- Hide API keys behind a simple Express proxy and call it from a React app.
- Handle units, exclusions, loading/empty/error states, and basic caching.
- Write small UI tests with Vitest + Testing Library.

## Prerequisites
- Node.js 18+ and npm
- An OpenWeatherMap API key in `.env` (see below)
- Key propagation: new keys may take 30–60 minutes to activate for programmatic calls.

## Part 1: Project Setup (5 minutes)
1. Open this project folder: `labs/labE-web-owm-weather`
2. Install deps:
   ```bash
   npm install
   ```
3. Copy env and set your key:
   ```bash
   cp .env.example .env
   # edit .env and set OWM_KEY=your_key_here
   ```
4. Start both server and client:
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:5173
   - Proxy API: http://localhost:3001/api/weather?q=Portland,OR,US

## Part 2: Understand the Architecture (3 minutes)
- `server/server.js`: Express route `/api/weather?q=...`
  - Uses Geocoding to get `lat/lon`
  - Calls One Call 3.0 with `lat/lon`, forwards trimmed JSON
- `vite.config.ts`: proxies `/api` → `http://localhost:3001` to avoid CORS
- `src/lib/api.ts`: client wrapper around `/api/weather`
- `src/App.tsx`: form + render current/hourly/daily + alerts

## Part 3: Build Features (15 minutes)
### Task 1: City → Weather flow
- In the UI, enter `q` like `Portland,OR,US` or `Paris,FR`
- Call `/api/weather?q=…&units=metric|imperial&exclude=minutely`
- Display: location name/country, current temp/conditions, next 3 hours, next 5 days

### Task 2: Units and Exclusions
- Add a units toggle (Metric/Imperial)
- Use `exclude` to reduce payload as needed (e.g., omit `minutely`)

### Task 3: States and Errors
- Show loading spinner while fetching
- Empty state before search
- Error state for 401/404/429/5xx
- Tip: if your key is brand new, try again after 30–60 min

### Task 4: Light Caching (Optional)
- Cache last successful response per `q+units` in memory for the session

## Part 4: Tests (7 minutes)
- Run tests: `npm test`
- `tests/App.test.tsx`: smoke test for the form → mocked fetch → renders current temp
- Add one more test: units toggle updates the label

## Part 5: Troubleshooting (3 minutes)
- 401 Unauthorized: often a new key propagation issue; wait 30–60 min
- 404 Not Found: bad path or place not found
- 429: too many requests; slow down and cache
- See official docs for deeper error matrices

## Part 6: Reflection (2 minutes)
- How did proxying keep the key out of the browser?
- Where would you add persistent caching (e.g., Redis) in production?

## References
- One Call 3.0: https://openweathermap.org/api/one-call-3
- Geocoding API: https://openweathermap.org/api/geocoding-api
- Pricing: https://openweathermap.org/price
- Note: New keys may take 30–60 minutes to activate for programmatic calls.

