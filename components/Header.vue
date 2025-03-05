<template>
  <div class="bg-white">
    <header class="absolute inset-x-0 top-0 z-50">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="../assets/logo.png" alt="" />
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-sm/6 font-semibold text-white">{{ item.name }}</a>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4">
          <a href="#" class="text-sm/6 font-semibold text-white">Ingresar <span aria-hidden="true">&rarr;</span></a>
          <a href="#" class="hover:underline flex items-center text-white" @click="toggleCart">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 m-1">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>

             ({{ cart.length }})
          </a>
          <div v-if="showCart" class="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-50" @click.self="toggleCart">
            <transition name="slide-fade">
              <div class="relative h-full w-2/5 bg-white border-l rounded-l shadow-lg p-4 cart-container">
                <button @click="toggleCart" class="absolute top-2 right-2 text-gray-700 cart-close-button">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                <h2 class="text-xl font-bold mb-4">Carrito de Compras</h2>
                <div v-if="cart.length === 0" class="text-center">El carrito está vacío</div>
                <div v-else class="overflow-y-auto h-full cart-content">
                  <div v-for="(item, index) in cart" :key="index" class="flex justify-between items-center mb-4">
                    <div>
                      <h3 class="font-bold">{{ item.name }}</h3>
                      <p>{{ item.price | currency }} x {{ item.quantity }}</p>
                      <p v-if="item.discount">Descuento: {{ item.discount | currency }}</p>
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
                
                <div v-if="showLogin" class="login-container">
                  <Login />
                  <button @click="showLogin = false" class="absolute top-2 left-2 text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                </div>

              </div>
            </transition>
          </div>
        </div>
      </nav>
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-50" />
        <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="size-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <a v-for="item in navigation" :key="item.name" :href="item.href" class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10">{{ item.name }}</a>
              </div>
              <div class="py-6">
                <a href="#" class="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10">Ingresar</a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import Login from './Login.vue'


const props = defineProps({
  cart: {
    type: Array,
    required: true
  },
  isLoggedIn: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['removeFromCart', 'updateCartItem'])

const navigation = [
  { name: 'Restaurantes', href: '#' },
  { name: 'Nosotros', href: '#' },
  { name: 'Contactos', href: '#' },
]

const mobileMenuOpen = ref(false)
const showCart = ref(false)
const showLogin = ref(false)

const router = useRouter()

const toggleCart = () => {
  showCart.value = !showCart.value
}

const removeFromCart = (index) => {
  emit('removeFromCart', index)
}

const updateCartItem = (index, quantity) => {
  emit('updateCartItem', { index, quantity })
}

const handleCheckout = () => {
  if (props.isLoggedIn) {
    router.push('/checkout')
  } else {
    showLogin.value = true
  }
}

const subtotal = computed(() => {
  return props.cart.reduce((acc, item) => acc + (item.price - (item.discount || 0)) * item.quantity, 0)
})

const tax = computed(() => {
  return subtotal.value * 0.21
})

const total = computed(() => {
  return subtotal.value + tax.value
})

const currency = (value) => {
  return `$${value.toFixed(2)}`
}
</script>

<style>
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

.login-container, .register-container {
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

.login-container button, .register-container button {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: none;
  border: none;
  cursor: pointer;
}

/* Transición personalizada */
.slide-fade-enter-active {
  transition: all 2s ease-out; /* Aumenta la duración a 2 segundos */
}
.slide-fade-leave-active {
  transition: all 1.5s ease-in; /* Aumenta la duración a 1.5 segundos */
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
</style>