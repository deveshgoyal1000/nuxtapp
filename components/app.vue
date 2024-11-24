<template>
    <div id="app">
      <div>
        <h1>Dynamic Image Editor</h1>
        <button @click="changeImage">Change Image</button>
      </div>
      <ImageEditor :imageSrc="imageUrl" />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import ImageEditor from './components/ImageEditor.vue';
  
  export default {
    name: 'App',
    components: {
      ImageEditor,
    },
    setup() {
      // Initial image source
      const imageUrl = ref('https://via.placeholder.com/800x600.png?text=Initial+Image');
  
      // Function to change the image source dynamically
      const changeImage = () => {
        imageUrl.value =
          'https://via.placeholder.com/800x600.png?text=New+Image';
      };
  
      return {
        imageUrl,
        changeImage,
      };
    },
  };
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    margin-top: 20px;
  }
  </style>
  