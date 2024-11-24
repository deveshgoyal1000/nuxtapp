import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    image: null,
    brightness: 1,
  }),
  actions: {
    setImage(image) {
      this.image = image
    },
    setBrightness(brightness) {
      this.brightness = brightness
    }
  }
})
