<template>
  <div class="register-container">
    <h2>Registro de Usuario</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-content">
        <div>
          <label for="name">Nombre</label>
          <input type="text" v-model="form.name" id="name" required />
        </div>
        <div>
          <label for="lastname">Apellido</label>
          <input type="text" v-model="form.lastname" id="lastname" required />
        </div>
        <div>
          <label for="ruc">RUC</label>
          <input type="text" v-model="form.ruc" id="ruc" required />
        </div>
        <div>
          <label for="rucType">Tipo de RUC</label>
          <input type="text" v-model="form.rucType" id="rucType" required />
        </div>
        <div>
          <label for="phone">Teléfono</label>
          <input type="text" v-model="form.phone" id="phone" required />
        </div>
        <div>
          <label for="address">Dirección</label>
          <input type="text" v-model="form.address" id="address" required />
        </div>
        <div>
          <label for="email">Correo Electrónico</label>
          <input type="email" v-model="form.email" id="email" required />
        </div>
        <div>
          <label for="password">Contraseña</label>
          <input type="password" v-model="form.password" id="password" required />
        </div>
      </div>
      <button type="submit" class="register-button">Registrar</button>
    </form>

        <!-- Toast -->
    <div v-if="toast.show" :class="['toast', toast.type]" class="fixed bottom-4 right-4 p-4 rounded shadow">
      {{ toast.message }}
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import useRecaptcha from '../composables/useRecaptcha' // Importa el composable
import apiService from '../service/apiService'

// Declarar el evento que se emitirá al componente padre
const emit = defineEmits(['closeRegisterModal'])

const form = ref({
  name: '',
  lastname: '',
  ruc: '',
  rucType: '',
  phone: '',
  address: '',
  email: '',
  password: ''
})

const { execute } = useRecaptcha() // Usa el composable para ejecutar reCAPTCHA

const toast = ref({
  show: false,
  message: '',
  type: '' // 'success' o 'error'
})

const handleRegister = async () => {
  try {
    
    // Ejecuta reCAPTCHA y obtiene el token
    const token = await execute('register')
    console.log('Token de reCAPTCHA:', token)

    // Envía los datos del formulario junto con el token de reCAPTCHA
    const response = await apiService.register(
      form.value.name,
      form.value.lastname,
      form.value.ruc,
      form.value.rucType,
      form.value.phone,
      form.value.address,
      form.value.email,
      form.value.password,
      { 'g-recaptcha-response': token } // Incluye el token en los headers o en el cuerpo
    )
    console.log('Registro exitoso:', response.data)
    alert('Registro exitoso. ¡Bienvenido!')

    // Mostrar toast de éxito
    showToast('Registro exitoso. ¡Bienvenido!', 'success')

    // Cerrar el modal de registro
    emit('closeRegisterModal')
  } catch (error) {
    console.error('Error en el registro:', error)
    alert('Error en el registro. Por favor, inténtalo de nuevo.')
    showToast('Error en el registro. Por favor, inténtalo de nuevo.', 'error')
  }
}

const showToast = (message, type) => {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: scroll;
}

.register-container h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.register-container form {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.form-content {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.register-container form div {
  margin-bottom: 0.5rem;
}

.register-container label {
  display: block;
  margin-bottom: 0.25rem;
}

.register-container input {
  width: 100%;
  padding: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.register-button {
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: auto;
}

.register-button:hover {
  background-color: #0056b3;
}

.toast {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  color: white;
  font-weight: bold;
}

.toast.success {
  background-color: #4caf50;
}

.toast.error {
  background-color: #f44336;
}
</style>