// vue.config.js
module.exports = {
    devServer: {
      port: 8080, // Change this to your desired development server port
    },
    configureWebpack: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'), // Set up path aliases for easier imports
        },
      },
    },
  };
  