<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-center mb-6">Registrarse</h2>
        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label for="name" class="block text-gray-700">Nombre</label>
            <input type="text" id="name" v-model="name" class="w-full px-3 py-2 border rounded-lg" required />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700">Correo Electrónico</label>
            <input type="email" id="email" v-model="email" class="w-full px-3 py-2 border rounded-lg" required />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-gray-700">Contraseña</label>
            <input type="password" id="password" v-model="password" class="w-full px-3 py-2 border rounded-lg" required />
          </div>
          <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg">Registrarse</button>
        </form>
        <p class="mt-4 text-center">
          ¿Ya tienes una cuenta? <router-link to="/login" class="text-blue-500">Inicia Sesión</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const router = useRouter()
  
  const handleRegister = () => {
    // Aquí iría la lógica para manejar el registro
    console.log('Registrarse con:', name.value, email.value, password.value)
    // Redirigir al usuario a la página de login después de registrarse
    router.push('/login')
  }
  </script>
  
  <style scoped>
  @import 'tailwindcss/tailwind.css';
  
  button[type="submit"] {
    position: relative;
    width: 100%; /* Ajusta el ancho del botón al 100% del contenedor */
    transform: translateX(-5%);
  }
  </style>