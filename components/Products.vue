<template>
  <div class="flex h-full">
    <!-- Contenedor de categorías -->
    <div class="w-1/4 bg-gray-100 p-4 overflow-y-auto">
      <h2 class="text-xl font-bold mb-4">Categorías</h2>
      <ul>
        <li
          @click="showAllProducts"
          class="cursor-pointer p-2 mb-2 bg-white rounded shadow hover:bg-gray-200"
        >
          Ver Todos
        </li>
        <li
          v-for="category in projects"
          :key="category.id"
          @click="selectCategory(category)"
          class="cursor-pointer p-2 mb-2 bg-white rounded shadow hover:bg-gray-200"
        >
          {{ category.name }}
        </li>
      </ul>
    </div>

    <!-- Contenedor de productos -->
    <div class="w-3/4 p-4 overflow-y-auto">
      <h2 v-if="selectedCategory" class="text-xl font-bold mb-4">Productos de {{ selectedCategory.name }}</h2>
      <h2 v-else class="text-xl font-bold mb-4">Todos los Productos</h2>
      <div v-if="products.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="product in products"
          :key="product.name"
          class="border p-4 rounded shadow"
        >
          <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded">
          <h3 class="text-lg font-bold mt-2">{{ product.name }}</h3>
          <p class="text-gray-500 mt-1">{{ product.price | currency }}</p>
          <button 
  @click="openProductModal(product)" 
  class="mt-2 bg-[#0C0B0B] text-white py-1 px-4 rounded hover:bg-gray-800"
>
  Ver Detalles
</button>
        </div>
      </div>
      <p v-else class="text-gray-500">No hay productos disponibles.</p>
    </div>

    <!-- Modal de detalles del producto -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <button class="modal-close" @click="closeModal">&times;</button>
        <h2 class="text-2xl font-bold mb-4">{{ selectedProduct.name }}</h2>
        <img :src="selectedProduct.image" :alt="selectedProduct.name" class="w-full h-48 object-cover rounded mb-4">
        <p class="text-gray-700 mb-4">{{ selectedProduct.description || 'Descripción no disponible.' }}</p>
        <p class="text-lg font-bold mb-4">Precio: {{ selectedProduct.price | currency }}</p>

        <!-- Opciones adicionales -->
        <div class="mb-4">
          <h3 class="text-lg font-bold mb-2">Extras</h3>
          <div v-for="extra in extras" :key="extra.id" class="flex items-center mb-2">
            <input type="checkbox" :id="extra.id" v-model="selectedExtras" :value="extra" class="mr-2">
            <label :for="extra.id">{{ extra.name }} (+{{ extra.price | currency }})</label>
          </div>
        </div>

<!-- Botón para añadir al carrito -->
<button 
  @click="addToCartWithExtras" 
  class="bg-[#0C0B0B] text-white py-2 px-4 rounded w-full hover:bg-gray-800"
>
  Añadir al Carrito
</button>
      </div>
    </div>

    <!-- Toast de confirmación -->
    <div v-if="showToast" class="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow">
      Producto añadido al carrito
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import apiService from '~/service/apiService'

const projects = ref([]) // Categorías
const allProducts = ref([]) // Todos los productos
const products = ref([]) // Productos filtrados
const selectedCategory = ref(null) // Categoría seleccionada
const selectedProduct = ref(null) // Producto seleccionado para el modal
const selectedExtras = ref([]) // Extras seleccionados
const showModal = ref(false) // Estado del modal
const showToast = ref(false) // Estado del toast

const emit = defineEmits(['categorySelected', 'addToCart'])

// Opciones de extras
const extras = [
  { id: 'extra1', name: 'Bebida', price: 2 },
  { id: 'extra2', name: 'Papas Fritas', price: 3 },
  { id: 'extra3', name: 'Postre', price: 4 }
]

// Cargar categorías y productos al montar el componente
onMounted(async () => {
  try {
    const categoryResponse = await apiService.getCategoryData()
    if (Array.isArray(categoryResponse.data.entity)) {
      projects.value = categoryResponse.data.entity.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        image: item.image,
        slug: item.slug,
      }))
    }

    const productResponse = await apiService.getProducts()
    if (Array.isArray(productResponse.data.entity)) {
      allProducts.value = productResponse.data.entity.map(product => ({
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        discount: product.discount || 0,
      }))
      products.value = allProducts.value
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

// Abrir modal con detalles del producto
const openProductModal = (product) => {
  selectedProduct.value = product
  selectedExtras.value = []
  showModal.value = true
}

// Cerrar modal
const closeModal = () => {
  showModal.value = false
}

// Añadir producto al carrito con extras
const addToCartWithExtras = () => {
  const productWithExtras = {
    ...selectedProduct.value,
    extras: selectedExtras.value,
    totalPrice: selectedProduct.value.price + selectedExtras.value.reduce((acc, extra) => acc + extra.price, 0)
  }
  emit('addToCart', productWithExtras) // Emitir el producto al carrito
  closeModal()
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Filtrar productos por categoría
const selectCategory = (category) => {
  selectedCategory.value = category
  emit('categorySelected', category)
  products.value = allProducts.value.filter(product => product.category === category.name)
}

// Mostrar todos los productos
const showAllProducts = () => {
  selectedCategory.value = null
  products.value = allProducts.value
}
</script>

<style scoped>
@import 'tailwindcss/tailwind.css';

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  position: relative;
  max-width: 500px;
  width: 100%;
}

.modal-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.toast {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background: #4caf50;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>