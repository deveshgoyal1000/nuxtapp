export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ['dcmjs', 'cornerstone-core', 'cornerstone-tools', 'dicom-parser'],
    extend(config, { isClient, isServer }) {
      if (isServer) {
        config.externals = { canvas: 'commonjs canvas' };
      }
    },
  },
  vite: {
    optimizeDeps: {
      include: ['dcmjs', 'cornerstone-core', 'cornerstone-tools', 'dicom-parser'],
      exclude: ['cornerstone-core'],  // Exclude cornerstone-core from Vite's optimization
    },
  },
});
