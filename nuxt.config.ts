// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/svg-sprite',
    '@nuxt/image'
  ],

  css: ['~/assets/css/main.css'],
  colorMode: {
    classSuffix: "",
    preference: "light",
    fallback: "light",
  },
  svgSprite: {
    input: '~/app/assets/sprite/svg/',
    output: '~/app/assets/sprite/gen/'
  },
  future: {
    compatibilityVersion: 4
  },
  ssr: false,
  compatibilityDate: '2024-11-27'
})