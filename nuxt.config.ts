import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ['dcmjs', 'cornerstone-core', 'cornerstone-tools', 'dicom-parser'], // Add relevant packages to transpile
  },
  vite: {
    server: {
      hmr: {
        overlay: false, // Disable HMR overlay to avoid conflicts
      },
    },
    optimizeDeps: {
      include: ['dcmjs', 'cornerstone-core', 'cornerstone-tools', 'dicom-parser'], // Ensure dependencies are optimized
      exclude: ['cornerstone-core'], // Exclude from Vite's optimization if necessary
    },
    define: {
      'process.env': {}, // Provide an empty object for process.env (if needed)
    },
  },
  router: {
    middleware: ['yourMiddleware'], // Add your router middleware if needed
  },
  nitro: {
    preset: 'node', // Adjust preset for your environment (if necessary)
  },
  tailwindcss: {
    viewer: true, // Enables Tailwind Viewer
  },
  plugins: [
    { src: '~/plugins/cornerstone.js', mode: 'client' }, // Add Cornerstone initialization if needed
  ],
  compatibilityDate: '2024-11-24', // Set the compatibility date for your project
})
