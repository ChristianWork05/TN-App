<template>
  <section class="h-auto overflow-x-auto">
    <div class="container mx-auto h-auto">
      <!-- Projects item wrapper -->
      <div class="projects-wrapper flex flex-wrap h-full overflow-y-hidden">
        <!-- Project Item -->
        <div v-for="project in projects" :key="project.id" class="flex-shrink-0  w-1/3 md:w-1/4 lg:w-1/5 p-2 ">
          <div class="flex bg-white shadow-md rounded-lg overflow-hidden group " @click="selectCategory(project)">
            <img :src="project.image" alt="Project" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import apiService from '~/service/apiService'

const projects = ref([])

const emit = defineEmits(['categorySelected'])

onMounted(async () => {
  try {
    const response = await apiService.getCategoryData()
    console.log('Category data:', response.data)
    // Ajusta el código según la estructura de los datos devueltos por la API
    if (Array.isArray(response.data.entity)) {
      projects.value = response.data.entity.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '', // Asegúrate de que la propiedad `description` exista en los datos de la API
        image: item.image, // Asegúrate de que la propiedad `image` exista en los datos de la API
        slug: item.slug, // Asegúrate de que la propiedad `slug` exista en los datos de la API
      }))
    } else {
      console.error('Expected an array but got:', response.data.entity)
    }
  } catch (error) {
    console.error('Error fetching category data:', error)
  }
})

const selectCategory = (category) => {
  emit('categorySelected', category)
}
</script>

<style scoped>
@import 'tailwindcss/tailwind.css';
</style>