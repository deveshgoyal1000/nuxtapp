<template>
  <div>
    <!-- Navigation -->
    <nav class="navbar">
      <nuxt-link to="/" class="nav-link">Home</nuxt-link>
      <nuxt-link to="/about" class="nav-link">About</nuxt-link>
      <nuxt-link to="/upload" class="nav-link">Upload</nuxt-link>
    </nav>

    <!-- Main Content -->
    <div class="content">
      <nuxt-child />
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Background and Body Styling */
body {
  background-color: #f4f7fc; /* Soft light background */
  color: #333; /* Dark text for contrast */
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  padding: 20px;
}

/* Navigation Bar */
.navbar {
  display: flex;
  justify-content: center;
  gap: 20px;
  background-color: #4c8bf5; /* Calming blue */
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

/* Main Content */
.content {
  max-width: 900px;
  margin: 30px auto;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 32px;
  color: #2e3a59; /* Darker, softer text */
  margin-bottom: 20px;
}
</style>
