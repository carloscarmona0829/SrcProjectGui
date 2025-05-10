import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'De Mis Manos App',
        short_name: 'De Mis Manos',
        start_url: '/',
        display: 'standalone',
        background_color: '#00AAB0',
        theme_color: '#00AAB0',
        icons: [
          {
            src: '/assets/images/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/images/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      srcDir: 'src', 
      filename: 'service-worker.js', 
    }),
  ],
});
