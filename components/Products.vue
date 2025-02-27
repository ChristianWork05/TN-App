<template>
  <section class="py-16 bg-gray-100">
    <!-- Section Title Start -->
    <div>
      <div class="animate_top text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900">{{ sectionTitle }}</h2>
        <p class="mt-4 text-lg text-gray-600">{{ sectionTitleText }}</p>
      </div>
    </div>
    <!-- Section Title End -->

    <div class="container mx-auto">
      <!-- Projects item wrapper -->
      <div class="projects-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Project Item -->
        <div v-for="project in projects" :key="project.id" :class="project.classes">
          <div class="bg-white shadow-md rounded-lg overflow-hidden group relative" @click="selectCategory(project)">
            <img :src="project.image" alt="Project" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <button @click.stop="selectCategory(project)" class="px-4 py-2 bg-indigo-600 text-white rounded-md">Ver más</button>
            </div>
            <div class="p-4">
              <h4 class="text-xl font-semibold text-gray-900">{{ project.title }}</h4>
              <p class="mt-2 text-gray-600">{{ project.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import apiService from '~/service/apiService'

const sectionTitle = ref('Categorias')
const sectionTitleText = ref('It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using.')

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
        title: item.name,
        description: item.description || '', // Asegúrate de que la propiedad `description` exista en los datos de la API
        image: item.image, // Asegúrate de que la propiedad `image` exista en los datos de la API
        slug: item.slug, // Asegúrate de que la propiedad `slug` exista en los datos de la API
/*         classes: 'branding' // Ajusta las clases según sea necesario */
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