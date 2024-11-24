export default defineNuxtConfig({
  modules: [
    '@nuxt/postcss8',
  ],
  css: [
    '@/assets/css/main.css', // Example: Ensure your PostCSS file paths are correct
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
