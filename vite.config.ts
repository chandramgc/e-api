import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tauri from 'vite-plugin-tauri';


export default defineConfig({
  plugins: [
    react(),
    tauri(), // enables @tauri-apps/api imports
  ],
  server: {
    // must match devPath in tauri.conf.json if changed
    port: 3000,
  },
});