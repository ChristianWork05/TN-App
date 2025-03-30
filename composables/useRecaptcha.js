import { useReCaptcha } from 'vue-recaptcha-v3'

export default () => {
  const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()

  const execute = async (action) => {
    try {
      await recaptchaLoaded() // Asegúrate de que reCAPTCHA esté cargado
      const token = await executeRecaptcha(action) // Ejecuta reCAPTCHA con la acción especificada
      return token
    } catch (error) {
      console.error('Error ejecutando reCAPTCHA:', error)
      throw new Error('No se pudo ejecutar reCAPTCHA.')
    }
  }

  return { execute }
}