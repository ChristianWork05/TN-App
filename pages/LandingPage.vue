<template>
  <div class="hero-section bg-cover bg-center h-screen flex items-center justify-center" style="background-image: url('/images/background-image.png');">
    <div class="bg-white bg-opacity-75 p-8 rounded-lg text-center">
      <h1 class="text-4xl font-bold mb-4">Bienvenidos a Nuestro Restaurante</h1>
      <p class="text-xl mb-6">Disfruta de la mejor comida y del delivery más rápido de todos</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(menu, index) in menus"
          :key="menu.id"
          @click="goToMenu(menu.id, menu.apiUrl)"
          class="relative cursor-pointer rounded-lg overflow-hidden transition-transform transform hover:scale-105 focus:scale-105 bg-cover bg-center"
          :style="{ backgroundImage: `url('${menu.image}')`, height: '300px', width: '300px' }"
        >
<!--           <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <h2 class="text-lg font-bold">{{ menu.title }}</h2>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiService from '../service/apiService'

export default {
  name: 'LandingPage',
  setup() {
    const menus = ref([
      { id: 0, title: 'KFC', image: '/images/kfc.png', apiUrl: 'https://kfc.devolada.ec/api' },
      { id: 1, title: 'Pizza Hut', image: '/images/pizzahut.png', apiUrl: 'https://pizzahut.devolada.ec/api' },
      { id: 2, title: 'Starbucks', image: '/images/starbucks.png', apiUrl: 'https://starbucks.devolada.ec/api' }
    ])
    const router = useRouter()

    const goToMenu = (id, apiUrl) => {
      // Cambiar el baseURL de la API según la opción seleccionada
      apiService.setBaseURL(apiUrl)
      console.log(`Base URL cambiada a: ${apiUrl}`)

      // Navegar a la página del menú
      router.push({ path: '/menu', query: { id } })
    }

    return {
      menus,
      goToMenu
    }
  }
}
</script>

<style scoped>
.hero-section {
  background-image: url('/images/background-image.png');
}

.grid {
  display: grid;
  gap: 1.5rem;
}

.cursor-pointer {
  transition: transform 0.3s ease;
}

.cursor-pointer:hover,
.cursor-pointer:focus {
  transform: scale(1.05);
}

.bg-cover {
  background-size: cover;
  background-position: center;
}

.bg-black {
  background-color: rgba(0, 0, 0, 0.5);
}

.text-white {
  color: #fff;
}
</style>