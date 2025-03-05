import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Checkout from '../components/Checkout.vue' // Asegúrate de tener este componente

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/checkout', component: Checkout },
  // Otras rutas...
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router