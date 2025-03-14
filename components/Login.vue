<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Correo Electrónico</label>
          <input type="email" id="email" v-model="email" class="w-full px-3 py-2 border rounded-lg" required />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700">Contraseña</label>
          <input type="password" id="password" v-model="password" class="w-full px-3 py-2 border rounded-lg" required />
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg">Iniciar Sesión</button>
      </form>
      <p class="mt-4 text-center">
        ¿No tienes una cuenta? <span @click="showRegister = true" class="text-blue-500 cursor-pointer">Regístrate</span>
      </p>
    </div>
    <div v-if="showRegister" class="register-container">

      <Register />
      <button @click="showRegister = false" class="absolute top-2 left-2 text-gray-700">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiService from '../service/apiService'

const email = ref('')
const password = ref('')
const router = useRouter()
const showRegister = ref(false)

const handleLogin = async () => {
  try {
    const response = await apiService.login(email.value, password.value);
    console.log(JSON.stringify(response.data));
    // Guardar el token o la información del usuario en el almacenamiento local
    localStorage.setItem('user', JSON.stringify(response.data));
    // Recargar la página para actualizar el estado de inicio de sesión
    location.reload();
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
@import 'tailwindcss/tailwind.css';

.register-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 10;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.register-container button {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: none;
  border: none;
  cursor: pointer;
}

button[type="submit"] {
  position: relative;
  width: 100%; /* Ajusta el ancho del botón al 100% del contenedor */
  transform: translateX(-5%);
}
</style>