export default {
  // General Nuxt configuration
  ssr: true, // or false depending on your preference
  target: 'server', // or 'static' if you are generating a static site

  vite: {
    // Disable Hot Module Replacement (HMR) for cornerstone-core
    server: {
      hmr: false,  // Disable HMR to prevent conflicts with cornerstone-core
    },
    optimizeDeps: {
      exclude: ['cornerstone-core'],  // Exclude cornerstone-core from Vite optimization
    },
  },

  build: {
    // Webpack-specific configurations (if you're falling back to Webpack)
    // For Vite-based projects, these can typically be left out.
    // If you want to tweak Webpack configurations, you can do so here.
  },

  // Module settings
  modules: [
    '@nuxtjs/tailwindcss', // Example, add your own modules
  ],

  // Other configuration
  css: [
    // Global stylesheets
    'assets/css/main.css',
  ],

  buildModules: [
    // Modules for build process
    '@nuxtjs/vite',
  ],

  // Configuration for Vue if needed
  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },

  // Server-side configuration if needed
  server: {
    port: 3000, // Adjust port if needed
    host: '0.0.0.0',
  },

  // Customize the Nuxt layout if you have specific needs
  layout: 'default', // or 'your-custom-layout'

  // You can also add any additional configuration for specific modules you're using.
}
