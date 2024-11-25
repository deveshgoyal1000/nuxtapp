import { defineNuxtPlugin } from '#app'
import { create } from 'naive-ui'

export default defineNuxtPlugin(nuxtApp => {
  const naive = create() // Create an instance of Naive UI
  nuxtApp.provide('naive', naive) // Inject it into the app context
})
