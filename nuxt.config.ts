import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  build: {
    transpile: ['naive-ui'],
  },
  tailwindcss: {
    viewer: true, // Enable Tailwind viewer to view CSS styles in dev
  },
  plugins: [
    { src: '~/plugins/naive-ui.js', mode: 'client' }
  ],
  // Any other configuration you may want to add
})
