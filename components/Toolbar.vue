<template>
  <div class="toolbar flex gap-2">
    <button @click="$emit('onToolSelect', 'zoom')">Zoom</button>
    <button @click="$emit('onToolSelect', 'crop')">Crop</button>
    <button @click="$emit('onToolSelect', 'adjust')">Adjust</button>
  </div>
</template>
