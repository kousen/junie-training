import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { App } from '../src/App';

const sample = {
  location: { name: 'Sample City', country: 'US', lat: 0, lon: 0 },
  weather: {
    current: { temp: 72, wind_speed: 5, weather: [{ description: 'clear sky' }] },
    hourly: [
      { dt: 1, temp: 73, weather: [{ main: 'Clear' }] },
      { dt: 2, temp: 74, weather: [{ main: 'Clear' }] },
      { dt: 3, temp: 75, weather: [{ main: 'Clear' }] }
    ],
    daily: [
      { dt: 10, temp: { max: 80, min: 60 }, weather: [{ main: 'Clear' }] },
      { dt: 11, temp: { max: 81, min: 61 }, weather: [{ main: 'Clear' }] },
      { dt: 12, temp: { max: 82, min: 62 }, weather: [{ main: 'Clear' }] },
      { dt: 13, temp: { max: 83, min: 63 }, weather: [{ main: 'Clear' }] },
      { dt: 14, temp: { max: 84, min: 64 }, weather: [{ main: 'Clear' }] }
    ]
  }
};

describe('App', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders weather after search', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValueOnce(new Response(JSON.stringify(sample), { status: 200 }));

    render(<App />);
    const input = screen.getByLabelText(/city or zip/i);
    fireEvent.change(input, { target: { value: 'Nowhere,US' } });
    fireEvent.click(screen.getByRole('button', { name: /get weather/i }));

    await waitFor(() => expect(screen.getByText(/Sample City/)).toBeInTheDocument());
    expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
  });
});

