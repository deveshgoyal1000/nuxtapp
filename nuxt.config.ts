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
      exclude: ['cornerstone-core'], // Exclude from Vite's dependency optimization
    },
    define: {
      'process.env': {}, // Provide an empty object for process.env
    },
    server: {
      hmr: {
        overlay: false, // Disable HMR error overlay
      },
    },
  },
});
