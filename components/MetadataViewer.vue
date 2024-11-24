<template>
    <div class="metadata">
      <h3>Metadata</h3>
      <pre>{{ metadata }}</pre>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const metadata = ref({
    // Example metadata
    patientName: 'John Doe',
    studyDate: '2024-11-01',
  })
  </script>
  
  <style scoped>
  /* Style your metadata viewer here */
  </style>
  