// https://nuxt.com/docs/api/configuration/nuxt-config
import 'dotenv/config';
export default defineNuxtConfig({

  devtools: { enabled: true },
  compatibilityDate: '2024-11-27',
  routeRules: {
    // '/': { redirect: '/auth' },
    // '/admin/': { redirect: '/admin/home' },
    // '/admin/home': { ssr: true },
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/svg-sprite',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-tiptap-editor',
    'nuxt-echarts',
  ],
  app: {
    head: {
      title: "SUPERHURE",
      link: [
        {
          rel: "icon",
          type: "image/x-icon", // or 'image/x-icon' if using .ico
          href: "/favicon.ico", // Update this path if using a different filename or format
        },
      ],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
        },
      ],
    },
  },

  css: ['~/assets/css/main.css', 'sweetalert2/dist/sweetalert2.min.css', 'vue3-toastify/dist/index.css'],
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
  imports: {
    dirs: ["constants/*.ts", "types/*.ts", "store/*.ts", "utils/*.ts", "composables/*.ts", "composables/*/*.ts"],
  },
  runtimeConfig: {
    // gitSecretKey: process.env.GITHUB_SECRET_KEY,
    accessTokenSecret: process.env.NUXT_ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.NUXT_REFRESH_TOKEN_SECRET,
    public: {
      baseURL: process.env.BASE_API_URL,
      // baseURL: process.env.NUXT_PUBLIC_BASE_URL,
      // gitClientID: process.env.GITHUB_CLIENT_ID,
      STORAGE_URL_UPLOADS: process.env.STORAGE_URL_JOB,
      STORAGE_URL_JOB: process.env.STORAGE_URL_JOB,
      STORAGE_URL_AVATAR: process.env.STORAGE_URL_AVATAR,
      STORAGE_URL_RESUME: process.env.STORAGE_URL_RESUME
    },
  },
  tiptap: {
    prefix: 'Tiptap',
    lowlight: {
      theme: 'github-dark',
    },
  },
  ssr: false,

})