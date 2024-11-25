<template>
  <nav class="flex justify-between p-4 bg-blue-600 text-white">
    <h1 class="text-xl font-bold">Medical Imaging App</h1>
    <ul class="flex gap-4">
      <li><nuxt-link to="/">Home</nuxt-link></li>
      <li><nuxt-link to="/upload">Upload</nuxt-link></li>
      <li><nuxt-link to="/about">About</nuxt-link></li>
    </ul>
  </nav>
</template>

<script setup>
// No specific script setup needed for this component
</script>

<style scoped>
nav {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li a {
  text-decoration: none;
  color: white;
  transition: color 0.3s ease;
}

li a:hover {
  color: #ffcc00;
}
</style>
