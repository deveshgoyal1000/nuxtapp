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
.metadata {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 20px;
}

h3 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

pre {
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
