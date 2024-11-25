<template>
  <div class="home">
    <h1>Welcome to the Medical Imaging App</h1>
    <p>Explore advanced tools for image manipulation and DICOM file handling.</p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home {
  margin-top: 50px;
  padding: 20px;
  text-align: center;
  animation: fadeIn 1.5s;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #f8d210;
}

p {
  color: #e0e0e0;
  font-size: 1.2em;
}

/* Fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
