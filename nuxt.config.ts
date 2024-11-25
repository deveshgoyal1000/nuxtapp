export default defineNuxtConfig({
  css: [],

  postcss: {
    plugins: {
      autoprefixer: {},
      tailwindcss: {}, // Example if you're using Tailwind CSS
    },
  },

  compatibilityDate: "2024-11-25",
});
