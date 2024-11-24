// nuxt.config.ts
export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  app: {
    head: {
      title: 'Medical Imaging App',
      meta: [{ name: 'description', content: 'A Nuxt 3 app for medical imaging' }]
    }
  },
  modules: ['@nuxt/postcss8'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
