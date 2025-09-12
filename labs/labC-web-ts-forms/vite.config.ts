import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
  const port = Number(process.env.PORT) || Number(process.env.VITE_PORT) || 5173;
  return {
    plugins: [react()],
    server: {
      port,
      // if the port is taken, Vite will try the next one unless strictPort is true
      strictPort: false,
    },
  };
});
