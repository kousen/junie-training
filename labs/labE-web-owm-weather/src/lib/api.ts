import { z } from 'zod';

const WeatherSchema = z.object({
  location: z.object({
    name: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    lat: z.number(),
    lon: z.number()
  }),
  weather: z.object({
    current: z.any(),
    hourly: z.array(z.any()).optional(),
    daily: z.array(z.any()).optional(),
    alerts: z.array(z.any()).optional()
  })
});

export type WeatherResponse = z.infer<typeof WeatherSchema>;

export async function getWeather(params: { q: string; units?: 'metric' | 'imperial'; exclude?: string; lang?: string; }): Promise<WeatherResponse> {
  const url = new URL('/api/weather', window.location.origin);
  url.searchParams.set('q', params.q);
  if (params.units) url.searchParams.set('units', params.units);
  if (params.exclude) url.searchParams.set('exclude', params.exclude);
  if (params.lang) url.searchParams.set('lang', params.lang);

  const res = await fetch(url.toString(), { headers: { 'Accept': 'application/json' } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed (${res.status})`);
  }
  const json = await res.json();
  return WeatherSchema.parse(json);
}

