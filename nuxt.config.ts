// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'], // Include your Tailwind CSS file
  modules: ['@nuxtjs/tailwindcss'],  // Add Tailwind CSS as a module

  // PostCSS configuration
  postcss: {
    plugins: {
      tailwindcss: {},  // Enable Tailwind CSS
      autoprefixer: {}, // Enable Autoprefixer
    },
  },
});
