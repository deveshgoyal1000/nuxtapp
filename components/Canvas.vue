<template>
  <div class="upload-container">
    <h1>Upload Medical Image</h1>
    <input type="file" @change="uploadFile" accept="image/*" />
  </div>
</template>

<script setup>
const uploadFile = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Handle file upload logic here
  }
};
</script>

<style scoped>
.upload-container {
  text-align: center;
  margin: 40px auto;
  max-width: 900px;
}

h1 {
  font-size: 28px;
  color: #2e3a59;
  margin-bottom: 20px;
}

input[type="file"] {
  padding: 10px;
  background-color: #f1f3f7;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  display: block;
  margin-bottom: 20px;
}
</style>
