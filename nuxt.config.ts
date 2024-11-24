export default defineNuxtConfig({
  css: ['@/assets/styles/tailwind.css'],
  modules: ['@pinia/nuxt', '@nuxt/image-edge', 'naive-ui/nuxt'],
  build: {
    transpile: ['naive-ui']
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'http://localhost:3000',
    },
  },
});
