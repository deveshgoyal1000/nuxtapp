import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ['dcmjs', 'cornerstone-core', 'cornerstone-tools', 'dicom-parser'], // Ensure packages are transpiled for Nuxt
  },
  vite: {
    server: {
      hmr: {
        overlay: false, // Disable HMR overlay to avoid conflicts during development
      },
    },
    optimizeDeps: {
      include: ['dcmjs', 'cornerstone-core', 'cornerstone-tools', 'dicom-parser'], // Ensure dependencies are optimized
      exclude: ['cornerstone-core'], // Exclude cornerstone-core from Vite's optimization to avoid issues
    },
    define: {
      'process.env': {}, // Provide an empty object for process.env (useful for environment issues)
    },
  },
  router: {
    middleware: ['yourMiddleware'], // Add your router middleware if needed
  },
  nitro: {
    preset: 'node', // Use Node preset for Nitro if required for your deployment environment
  },
  tailwindcss: {
    viewer: true, // Enable Tailwind viewer for easier development
  },
  plugins: [
    { src: '~/plugins/cornerstone.js', mode: 'client' }, // Add Cornerstone initialization plugin, only on client-side
  ],
  compatibilityDate: '2024-11-24', // Set the compatibility date for your project
})
