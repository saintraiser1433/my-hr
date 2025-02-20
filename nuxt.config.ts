// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/icon'],

  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4
  },
  ssr: false,
  compatibilityDate: '2024-11-27'
})