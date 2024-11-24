import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    metadata: null,
    image: null,
  }),
  actions: {
    setMetadata(data) {
      this.metadata = data;
    },
    setImage(data) {
      this.image = data;
    },
  },
});
