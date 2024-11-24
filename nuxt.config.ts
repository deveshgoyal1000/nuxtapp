export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ['dcmjs', 'cornerstone-core', 'cornerstone-tools', 'dicom-parser'],
  },
  vite: {
    optimizeDeps: {
      include: ['dcmjs', 'cornerstone-core', 'cornerstone-tools', 'dicom-parser'],
      exclude: ['cornerstone-core'] // Exclude from Vite's optimization
    },
    define: {
      'process.env': {}, // Polyfill process.env for cornerstone compatibility
    },
  },
});
