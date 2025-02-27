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
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H19M7 13l-1.5 6h11l-1.5-6M10 21h4M10 21h4"></path>
            </svg>
            Carrito ({{ cart.length }})
          </a>
          <div v-if="showCart" class="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg">
            <div class="p-4">
              <h2 class="text-xl font-bold mb-4">Carrito de Compras</h2>
              <div v-if="cart.length === 0" class="text-center">El carrito está vacío</div>
              <div v-else>
                <div v-for="(item, index) in cart" :key="index" class="flex justify-between items-center mb-4">
                  <div>
                    <h3 class="font-bold">{{ item.name }}</h3>
                    <p>{{ item.price | currency }} x {{ item.quantity }}</p>
                  </div>
                  <div class="flex items-center">
                    <button @click="removeFromCart(index)" class="text-red-500 hover:text-red-700">Eliminar</button>
                    <input type="number" v-model.number="item.quantity" min="1" class="ml-2 w-12 text-center border rounded" />
                  </div>
                </div>
                <div class="border-t pt-4">
                  <p class="font-bold">Subtotal: {{ subtotal | currency }}</p>
                  <p class="font-bold">IVA (21%): {{ tax | currency }}</p>
                  <p class="font-bold">Total: {{ total | currency }}</p>
                </div>
              </div>
            </div>
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
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  cart: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['removeFromCart'])

const navigation = [
  { name: 'Ordenar', href: '#' },
  { name: 'Contactos', href: '#' },
  { name: 'Restaurantes', href: '#' },
  { name: 'Nosotros', href: '#' },
]

const mobileMenuOpen = ref(false)
const showCart = ref(false)

const toggleCart = () => {
  showCart.value = !showCart.value
}

const removeFromCart = (index) => {
  emit('removeFromCart', index)
}

const subtotal = computed(() => {
  return props.cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
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
</style>