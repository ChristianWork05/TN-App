<template>
  <div class="hero-section bg-cover bg-center h-screen flex items-center justify-center" style="background-image: url('/images/background-image.png');">
    <div class="bg-white bg-opacity-75 p-8 rounded-lg text-center">
      <h1 class="text-4xl font-bold mb-4">Bienvenidos a Nuestro Restaurante</h1>
      <p class="text-xl mb-6">Disfruta de la mejor comida en un ambiente acogedor</p>
      <div class="flex justify-center space-x-4">
        <button v-for="branch in branches" :key="branch.id" @click="goToMenu(branch)" class="bg-gray-800 text-white py-4 px-6 rounded-lg hover:bg-gray-700 shadow-lg transition-transform transform hover:-translate-y-1">
          <div class="text-left flex flex-col">
            <h3 class="text-lg font-bold">{{ branch.name }}</h3>
            <p class="text-sm">{{ branch.address }}</p>
            <p class="text-sm">{{ branch.city }}, {{ branch.state }}</p>
            <p class="text-sm">{{ branch.location }}</p>
            <p class="text-sm">{{ branch.slug }}</p>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import apiService from '../service/apiService'
import { useRouter } from 'vue-router'

export default {
  name: 'LandingPage',
  setup() {
    const branches = ref([])
    const router = useRouter()

    onMounted(async () => {
      try {
        const response = await apiService.getBranches()
        if (response.data && Array.isArray(response.data.entity)) {
          branches.value = response.data.entity
          console.log('Branches data:', branches.value) // Verificar la información obtenida

          // Validar si los datos están llegando correctamente
          const branch = branches.value.find(branch => branch.id === 5)
          if (branch) {
            console.log('Branch data:', branch)
          } else {
            console.error('Branch with id 5 not found')
          }
        } else {
          console.error('Expected an array but got:', response.data)
        }
      } catch (error) {
        console.error('Error fetching branches:', error)
      }
    })

    const goToMenu = (branch) => {
      router.push({ path: '/menu', query: { branchId: branch.id } })
    }

    return {
      branches,
      goToMenu
    }
  }
}
</script>

<style scoped>
.hero-section {
  background-image: url('/images/background-image.png');
}

button {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #333; /* Dark gray background */
  color: #fff; /* White text */
}

button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  background-color: #444; /* Slightly lighter gray on hover */
}

button div {
  text-align: left;
}

button h3 {
  color: #fff; /* White text for the title */
}

button p {
  color: #ccc; /* Light gray text for the details */
}
</style>