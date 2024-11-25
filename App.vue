<template>
  <div>
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
/* Navigation Bar */
.navbar {
  display: flex;
  justify-content: center;
  gap: 20px;
  background-color: #007bff;
  padding: 10px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-link:hover {
  text-decoration: underline;
}

/* Main Content */
.content {
  text-align: center;
  margin-top: 20px;
}
</style>
