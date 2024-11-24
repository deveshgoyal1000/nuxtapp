export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  build: {
    transpile: [
      "dcmjs",
      "cornerstone-core",
      "cornerstone-tools",
      "dicom-parser",
      "cornerstone-wado-image-loader",
    ],
    extend(config) {
      config.externals = { canvas: "commonjs canvas" };
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        "dcmjs",
        "cornerstone-core",
        "cornerstone-tools",
        "dicom-parser",
        "cornerstone-wado-image-loader",
      ],
    },
  },
});
