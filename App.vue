<template>
  <div class="app">
    <!-- Navigation -->
    <nav class="navbar">
      <NuxtLink to="/" class="nav-link">Home</NuxtLink>
      <NuxtLink to="/about" class="nav-link">About</NuxtLink>
      <NuxtLink to="/viewer" class="nav-link">Upload</NuxtLink>
    </nav>

    <!-- Main Content -->
    <div class="content">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* App Container */
.app {
  font-family: 'Arial', sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #007bff, #6610f2);
  color: #fff;
  display: flex;
  flex-direction: column;
}

/* Navigation Bar */
.navbar {
  display: flex;
  justify-content: center;
  gap: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1em;
  transition: all 0.3s ease;
}

.nav-link:hover {
  text-decoration: underline;
  color: #f8d210;
}

/* Main Content */
.content {
  text-align: center;
  margin-top: 20px;
  flex: 1;
  padding: 20px;
}
</style>
