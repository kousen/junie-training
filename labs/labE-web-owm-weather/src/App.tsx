import { useMemo, useState } from 'react';
import { getWeather } from './lib/api';

type Units = 'metric' | 'imperial';

export function App() {
  const [q, setQ] = useState('');
  const [units, setUnits] = useState<Units>('imperial');
  const [exclude] = useState('minutely');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const unitSymbol = useMemo(() => units === 'metric' ? '°C' : '°F', [units]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setData(null);
    if (!q.trim()) return;
    setLoading(true);
    try {
      const d = await getWeather({ q, units, exclude });
      setData(d);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', margin: '2rem auto', maxWidth: 800 }}>
      <h1>OpenWeatherMap One Call 3.0 (Lab E)</h1>
      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          aria-label="City or ZIP"
          placeholder="e.g., Portland,OR,US or 10001,US"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <select aria-label="Units" value={units} onChange={(e) => setUnits(e.target.value as Units)}>
          <option value="metric">Metric (C)</option>
          <option value="imperial">Imperial (F)</option>
        </select>
        <button type="submit">Get Weather</button>
      </form>

      {!q && <p style={{ marginTop: 12 }}>Enter a city (with country) or ZIP to begin.</p>}
      {loading && <p style={{ marginTop: 12 }}>Loading…</p>}
      {error && <p role="alert" style={{ marginTop: 12, color: 'crimson' }}>{error}</p>}

      {data && (
        <div style={{ marginTop: 16 }}>
          <h2>{data.location.name}{data.location.state ? `, ${data.location.state}` : ''} ({data.location.country})</h2>
          <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <h3>Current</h3>
              <p style={{ fontSize: 24, margin: 0 }}>{Math.round(data.weather.current.temp)}{unitSymbol}</p>
              <p style={{ margin: 0 }}>{data.weather.current.weather?.[0]?.description ?? '—'}</p>
              <p style={{ margin: 0 }}>Wind: {Math.round(data.weather.current.wind_speed)} {units === 'metric' ? 'm/s' : 'mph'}</p>
            </div>
            <div>
              <h3>Next 3 Hours</h3>
              <ul>
                {data.weather.hourly?.slice(0, 3).map((h: any) => (
                  <li key={h.dt}>{new Date(h.dt * 1000).toLocaleTimeString()} • {Math.round(h.temp)}{unitSymbol} • {h.weather?.[0]?.main}</li>
                ))}
              </ul>
            </div>
          </section>

          <section style={{ marginTop: 16 }}>
            <h3>Next 5 Days</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
              {data.weather.daily?.slice(0, 5).map((d: any) => (
                <div key={d.dt} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 8 }}>
                  <div>{new Date(d.dt * 1000).toLocaleDateString()}</div>
                  <div>{Math.round(d.temp.max)} / {Math.round(d.temp.min)}{unitSymbol}</div>
                  <div>{d.weather?.[0]?.main}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      <hr style={{ margin: '24px 0' }} />
      <p style={{ color: '#555' }}>
        Note: New API keys may take 30–60 minutes to activate for programmatic calls. If you get 401, try again later.
      </p>
    </div>
  );
}

