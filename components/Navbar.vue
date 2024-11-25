<template>
  <nav class="navbar">
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link to="/about" class="nav-link">About</router-link>
    <router-link to="/upload" class="nav-link">Upload</router-link>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  gap: 20px;
  background-color: #4c8bf5;
  padding: 15px 0;
  border-radius: 8px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
