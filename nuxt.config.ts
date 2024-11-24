// https://nuxt.com/docs/api/configuration/nuxt-config 
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ['dcmjs', 'cornerstone-core', 'cornerstone-tools', 'dicom-parser'], // Transpile DICOM-related libraries
    extend(config, { isClient, isServer }) {
      if (isServer) {
        config.externals = { canvas: 'commonjs canvas' }; // Prevent canvas from causing issues in SSR
      }
    },
  },
  vite: {
    optimizeDeps: {
      include: ['dcmjs', 'cornerstone-core', 'cornerstone-tools', 'dicom-parser'], // Pre-bundle these dependencies for faster builds
    },
  },
});
