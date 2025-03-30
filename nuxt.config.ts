export default defineNuxtConfig({
  devtools: { enabled: true },
  plugins: [
    '~/plugins/recaptcha.js', // Registro del plugin
  ],
  modules: ['@nuxtjs/tailwindcss']
})