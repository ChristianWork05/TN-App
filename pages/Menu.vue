<template>
  <div class="flex h-screen p-8">
    <div class="w-auto h-auto bg-[#0C0B0B] rounded-md text-white flex flex-col items-center justify-center py-8 space-y-8 mr-16 hidden md:flex shadow-lg shadow-black">
      <div class="text-4xl font-bold">D</div>
      <nav class="flex flex-col space-y-8">
  <div
    v-for="(tab, index) in tabs"
    :key="index"
    @click="activeTab = index"
    :class="['relative flex items-center justify-center w-16 h-16 rounded cursor-pointer', activeTab === index ? 'bg-gray-600' : 'hover:bg-gray-700']"
  >
    <svg :class="tab.iconClass" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path :d="tab.iconPath"></path>
      <path :d="tab.iconPath2"></path>
    </svg>
    <span v-if="index === 1 && totalItems > 0" class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{{ totalItems }}</span>
  </div>
</nav>

      <button @click="handleAuth" class="flex items-center justify-center w-16 h-16 hover:bg-gray-700 rounded mt-auto">
        <svg v-if="isLoggedIn" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </button>
    </div>
    <div class="flex-1 p-4">
      <div class="flex items-center mb-4">
  <svg @click="goToHero" class="w-8 h-8 mr-2 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
  </svg>
  <h1 class="text-4xl font-bold">{{ menuData.title }}</h1>
</div>
<div v-if="activeTab === 0" class="flex h-full">
  <Products @categorySelected="fetchProductsByCategory" @addToCart="addToCart" />
</div>
<div v-if="activeTab === 1">
  <div v-if="cart.length === 0" class="text-center">El carrito está vacío</div>
  <div v-else class="overflow-y-auto h-full cart-content">
    <div v-for="(item, index) in cart" :key="index" class="flex justify-between items-center mb-4">
      <div>
        <h3 class="font-bold">{{ item.name }}</h3>
        <p>{{ item.price | currency }} x {{ item.quantity }}</p>
        <p v-if="item.extras && item.extras.length > 0">
          Extras: {{ item.extras.map(extra => extra.name).join(', ') }}
        </p>
      </div>
      <div class="flex items-center">
        <button @click="removeFromCart(index)" class="text-red-500 hover:text-red-700">Eliminar</button>
        <input type="number" v-model.number="item.quantity" min="1" @change="updateCartItem(index, item.quantity)" class="ml-2 w-12 text-center border rounded" />
      </div>
    </div>
    <div class="border-t pt-4 cart-footer">
      <p class="font-bold">Subtotal: {{ subtotal | currency }}</p>
      <p class="font-bold">IVA (21%): {{ tax | currency }}</p>
      <p class="font-bold">Total: {{ total | currency }}</p>
    </div>
    <button @click="handleCheckout" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full cart-button">Proceder a la Compra</button>
  </div>
</div>
      <div v-if="activeTab === 2">
        <h2 class="text-2xl font-bold">{{ menuData.subtitle }}</h2>
  <p class="text-lg mt-2">{{ menuData.description }}</p>
  <p class="text-gray-700 mt-4">{{ menuData.generalInfo }}</p>
  <ul class="list-disc list-inside mt-4">
    <li v-for="(highlight, index) in menuData.highlights" :key="index" class="text-gray-600">
      {{ highlight }}
    </li>
  </ul>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
    <img
  v-for="(image, index) in menuData.images"
  :key="index"
  :src="image"
  :alt="`Imagen de ${menuData.title}`"
  class="w-full h-48 object-cover rounded-md shadow-md"
/>
      </div>
      </div>
      <div v-if="activeTab === 3">
  <h2 class="text-2xl font-bold">Ubicación</h2>
  <p class="text-lg mt-2">{{ menuData.location }}</p>
  <iframe
    v-if="menuData.mapUrl"
    :src="menuData.mapUrl"
    class="w-full h-64 mt-4 rounded-lg"
    frameborder="0"
    allowfullscreen
  ></iframe>
    </div>
      <div v-if="showLogin" class="modal-overlay" @click.self="showLogin = false">
        <div class="modal">
          <button class="modal-close" @click="showLogin = false">&times;</button>
          <Login @close="showLogin = false" />
        </div>
      </div>
    </div>
    <!-- Menú móvil -->
    <div class="fixed bottom-0 left-0 right-0 bg-[#0C0B0B] text-white flex justify-around py-4 md:hidden">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
        :class="['flex flex-col items-center cursor-pointer', activeTab === index ? 'text-blue-500' : 'text-gray-400']"
      >
        <svg :class="tab.iconClass" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path :d="tab.iconPath"></path>
        </svg>
      </div>
      <button @click="handleAuth" class="flex flex-col items-center cursor-pointer">
        <svg v-if="isLoggedIn" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Products from '../components/Products.vue'
import Login from '../components/Login.vue'
import apiService from '../service/apiService'

const isLoggedIn = ref(false)
const route = useRoute()
const router = useRouter()
const activeTab = ref(0)
const cart = ref([])
const selectedCategory = ref(null)
const products = ref([])
const showLogin = ref(false)

const tabs = [
  { iconClass: '', iconPath: "m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9", iconPath2: '' },
  { iconClass: '', iconPath: "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" , iconPath2: '' },
  { iconClass: '', iconPath: 'm11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z', iconPath2: '' },
  { iconClass: '', iconPath: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z', iconPath2: 'M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z' }
]


const menuData = ref({
  title: '',
  subtitle: '',
  description: '',
  items: [],
  location: '',
  mapUrl: ''
})

const menuContent = [
  {
    id: 0,
    title: 'KFC',
    subtitle: 'Kentucky Fried Chicken',
    description: 'KFC es una de las cadenas de comida rápida más reconocidas a nivel mundial, famosa por su pollo frito crujiente y delicioso.',
    generalInfo: 'Fundada en 1930, KFC se especializa en ofrecer pollo frito preparado con una receta secreta de 11 hierbas y especias. Con más de 24,000 restaurantes en todo el mundo, KFC se ha convertido en un ícono de la comida rápida.',
    highlights: [
      'Pollo frito crujiente y jugoso.',
      'Receta secreta de 11 hierbas y especias.',
      'Presencia en más de 145 países.'
    ],
    images: [
      '/images/franquicia-kfc.jpg',
      '/images/guayaquil-ecuador-kfc.jpg',
      '/images/kfc-comida.jpg'
    ],
    location: 'Av. Principal 123, Ciudad',
    mapUrl: 'https://www.google.com/maps/embed?...'
  },
  {
    id: 1,
    title: 'Pizza Hut',
    subtitle: 'Deliciosas Pizzas y Más',
    description: 'Pizza Hut es conocida por sus pizzas innovadoras y deliciosas, así como por su compromiso con la calidad y el sabor.',
    generalInfo: 'Desde su fundación en 1958, Pizza Hut ha sido pionera en la industria de las pizzas, ofreciendo una amplia variedad de sabores y estilos. Su misión es brindar momentos deliciosos para compartir.',
    highlights: [
      'Pizzas innovadoras y personalizables.',
      'Más de 18,000 restaurantes en todo el mundo.',
      'Compromiso con la calidad y el sabor.'
    ],
    images: [
      '/images/New-Store-Image-Pizza_Hut_2-1536x1023.jpg',
      '/images/love_pizza-768x682.jpg',
      '/images/momo-upload.jpg'
    ],
    location: 'Calle Secundaria 456, Ciudad',
    mapUrl: 'https://www.google.com/maps/embed?...'
  },
  {
    id: 2,
    title: 'Starbucks',
    subtitle: 'Café y Experiencias Únicas',
    description: 'Starbucks es la cadena de cafeterías más grande del mundo, ofreciendo café de alta calidad y un ambiente acogedor.',
    generalInfo: 'Desde 1971, Starbucks ha redefinido la experiencia del café, creando un espacio donde las personas pueden reunirse, trabajar o relajarse mientras disfrutan de bebidas y alimentos de alta calidad.',
    highlights: [
      'Café de origen ético y alta calidad.',
      'Más de 33,000 tiendas en todo el mundo.',
      'Compromiso con la sostenibilidad y la comunidad.'
    ],
    images: [
      '/images/star-store.jpg',
      '/images/Starbucks-Employees-Project-Photo-scaled.jpg',
      '/images/starbucks-food-menu.jpg'
    ],
    location: 'Plaza Central, Ciudad',
    mapUrl: 'https://www.google.com/maps/embed?...'
  }
]

const loadMenuData = () => {
  const menuId = parseInt(route.query.id)
  if (!isNaN(menuId)) {
    const selectedMenu = menuContent.find(menu => menu.id === menuId)
    if (selectedMenu) {
      menuData.value = selectedMenu
    } else {
      console.error('No se encontró un menú con el id:', menuId)
      menuData.value = {
        title: 'Menú no encontrado',
        subtitle: '',
        description: 'No se pudo cargar la información del menú.',
        items: [],
        location: '',
        mapUrl: ''
      }
    }
  } else {
    console.error('El parámetro id no es válido:', route.query.id)
  }
}

onMounted(() => {
  loadMenuData()
})

watch(() => route.query.id, () => {
  loadMenuData()
})

const handleAuth = () => {
  if (isLoggedIn.value) {
    // Lógica para cerrar sesión
    localStorage.removeItem('user')
    isLoggedIn.value = false
    window.location.reload() // Recargar la página
  } else {
    // Lógica para iniciar sesión
    showLogin.value = true
  }
}

const goToHero = () => {
  router.push('/landingPage')
}

const removeFromCart = (index) => {
  cart.value.splice(index, 1)
}

const updateCartItem = (index, quantity) => {
  cart.value[index].quantity = quantity
}

const handleCheckout = () => {
  if (isLoggedIn.value) {
    router.push('/checkout')
  } else {
    showLogin.value = true
  }
}

const subtotal = computed(() => {
  return cart.value.reduce((acc, item) => acc + (item.price - (item.discount || 0)) * item.quantity, 0)
})

const tax = computed(() => {
  return subtotal.value * 0.21
})

const total = computed(() => {
  return subtotal.value + tax.value
})

const totalItems = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.quantity, 0)
})

const currency = (value) => {
  return `$${value.toFixed(2)}`
}

const fetchProductsByCategory = async (category) => {
  selectedCategory.value = category
  try {
    const response = await apiService.getProducts()
    console.log('API response:', response.data) // Verifica los datos recibidos
    // Asegúrate de que response.data es un array
    if (Array.isArray(response.data.entity)) {
      products.value = response.data.entity.filter(element => element.category === category.name).map(element => ({
        category: element.category,
        discount: element.discount,
        image: element.image,
        name: element.name,
        price: element.price
      }))
      console.log('Filtered products:', products.value) // Verifica los productos filtrados
    } else {
      console.error('Expected an array but got:', response.data)
    }
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const clearCategory = () => {
  selectedCategory.value = null
  products.value = []
}

const addToCart = (product) => {
  const existingProduct = cart.value.find(item => item.name === product.name)
  if (existingProduct) {
    existingProduct.quantity += 1
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
  console.log('Producto añadido al carrito:', cart.value) // Verificar en consola
}

// Verificar el estado de inicio de sesión al montar el componente
onMounted(() => {
  const user = localStorage.getItem('user')
  isLoggedIn.value = !!user
  console.log('Estado de inicio de sesión:', isLoggedIn.value)
})

</script>

<style scoped>
@import 'tailwindcss/tailwind.css';
.cart-container {
  height: 100vh; /* Altura completa de la pantalla */
  width: 40vw; /* 40% del ancho de la pantalla */
  background-color: white;
  border-left: 1px solid #e5e7eb; /* Border color */
  border-radius: 0 0.375rem 0.375rem 0; /* Rounded corners on the left side */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* Shadow */
  padding: 1rem; /* Padding */
  position: relative; /* Position relative for absolute positioning of close button */
}

.cart-close-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: #4b5563; /* Gray color */
}

.cart-content {
  overflow-y: auto; /* Scrollable content */
  height: calc(100% - 4rem); /* Adjust height to account for padding and other elements */
}

.cart-footer {
  border-top: 1px solid #e5e7eb; /* Border color */
  padding-top: 1rem; /* Padding top */
  margin-top: 1rem; /* Margin top */
}

.cart-button {
  margin-top: 1rem; /* Margin top */
  background-color: #3b82f6; /* Blue background */
  color: white; /* White text */
  padding: 0.5rem 1rem; /* Padding */
  border-radius: 0.375rem; /* Rounded corners */
  width: 100%; /* Full width */
}

/* Estilos para el modal */
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

/* Transición personalizada */
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.5s ease-in;
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
</style>