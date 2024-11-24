import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  build: {
    transpile: ['cornerstone-core', 'cornerstone-tools', 'dicom-parser'], // Add your cornerstone related packages here
  },
  css: [
    // Add your global styles here if needed
    '@/assets/styles/main.css',
  ],
  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
    },
    optimizeDeps: {
      include: ['cornerstone-core', 'cornerstone-tools', 'dicom-parser'], // Ensure necessary dependencies are optimized by Vite
    },
    define: {
      'process.env': {}, // If you're using environment variables
    },
  },
  router: {
    middleware: ['yourMiddleware'], // Adjust with your middleware if you have one
  },
  nitro: {
    preset: 'node', // Adjust preset if necessary for your environment
  },
  tailwindcss: {
    viewer: true, // Enables Tailwind Viewer
  },
  plugins: [
    { src: '~/plugins/cornerstone.js', mode: 'client' }, // Add Cornerstone initialization if required
  ],
  compatibilityDate: '2024-11-24', // You can set this to match your desired compatibility date
})
