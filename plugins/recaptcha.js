import { VueReCaptcha } from 'vue-recaptcha-v3'

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    siteKey: '6LeN7NMUAAAAAKl3-UCI_LW99_53Ktbd1rRkdVN1', // Reemplaza con tu clave de sitio
    loaderOptions: {
      autoHideBadge: true,
      useRecaptchaNet: true,
      explicitRenderParameters: {
        badge: 'bottomleft',
      },
    },
  }

  nuxtApp.vueApp.use(VueReCaptcha, options)
})