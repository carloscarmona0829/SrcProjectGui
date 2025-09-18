import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // server: {
  //   host: '0.0.0.0', // Escucha en todas las interfaces de red y habilita el link de Network
  //   port: 5173       // Asegúrate de que este puerto esté disponible
  // },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'SrcProject App',
        short_name: 'rcProject',
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
