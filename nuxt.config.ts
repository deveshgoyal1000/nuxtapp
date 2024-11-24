export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ['dcmjs', 'cornerstone-core', 'cornerstone-tools', 'dicom-parser'],
    extend(config, { isClient, isServer }) {
      if (isServer) {
        // Handle server-side dependencies that need to be externalized
        config.externals = { canvas: 'commonjs canvas' };
      }
    },
  },
  vite: {
    optimizeDeps: {
      // Exclude cornerstone-core from Vite's optimization (no need to include it)
      exclude: ['cornerstone-core'],
    },
  },
});
