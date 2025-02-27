<template>
  <div>
    <Header :cart="cart" @removeFromCart="removeFromCart" />
    <!-- Hero Section -->
    <section class="relative w-full h-screen">
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-full h-full overflow-hidden">
          <div class="flex transition-transform duration-500 ease-in-out h-full" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <div v-for="(slide, index) in slides" :key="index" class="w-full flex-shrink-0 h-full flex bg-gradient-to-r from-blue-500 to-green-500">
              <div class="w-1/2 p-8 flex flex-col justify-center h-full">
                <h2 class="text-4xl font-bold text-white">{{ slide.title }}</h2>
                <h3 class="text-2xl text-white mt-4">{{ slide.subtitle }}</h3>
                <p class="text-white mt-4">{{ slide.description }}</p>
                <a :href="slide.ctaLink" class="mt-6 inline-block bg-white text-blue-500 py-2 px-4 rounded">{{ slide.ctaText }}</a>
              </div>
              <div class="w-1/2 bg-cover bg-center h-full" :style="{ backgroundImage: `url(${slide.image})` }"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <Products v-if="!selectedCategory" @categorySelected="fetchProductsByCategory" />

    <!-- Products Section -->
    <section class="py-12" v-if="selectedCategory">
      <div class="container mx-auto">
        <button @click="clearCategory" class="mb-4 flex items-center text-blue-500 hover:text-blue-700">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Volver a Categorías
        </button>
        <h2 class="text-3xl font-bold text-center mb-8">Nuestros Productos</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="product in products" :key="product.id" class="border p-4 rounded">
            <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover">
            <h3 class="text-xl font-bold mt-4">{{ product.name }}</h3>
            <p class="mt-2">{{ product.price | currency }}</p>
            <button @click="addToCart(product)" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Añadir al Carrito</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="bg-gray-100 py-12">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center mb-8">Testimonios</h2>
        <div class="relative">
          <div class="overflow-hidden">
            <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentTestimonial * 100}%)` }">
              <div v-for="(testimonial, index) in testimonials" :key="index" class="w-full flex-shrink-0 p-4">
                <p class="text-lg italic">"{{ testimonial.text }}"</p>
                <p class="mt-4 font-bold">- {{ testimonial.author }}</p>
              </div>
            </div>
          </div>
          <div class="absolute inset-0 flex justify-between items-center">
            <button @click="prevTestimonial" class="p-2 bg-white rounded-full shadow-md">
              <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button @click="nextTestimonial" class="p-2 bg-white rounded-full shadow-md">
              <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white p-8">
      <div class="container mx-auto">
        <!-- Subscription Section -->
        <div class="mb-8 text-center">
          <h2 class="text-2xl font-bold mb-4">Suscríbete a nuestro boletín</h2>
          <div class="flex justify-center">
            <input type="email" placeholder="Ingresa tu correo electrónico" class="p-2 rounded-l-md border-none focus:outline-none" />
            <button class="bg-blue-500 text-white p-2 rounded-r-md">Suscribirse</button>
          </div>
        </div>

        <!-- Menu Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 class="text-xl font-bold mb-4">Menú 1</h3>
            <ul>
              <li><a href="#" class="hover:underline">Subtítulo 1</a></li>
              <li><a href="#" class="hover:underline">Subtítulo 2</a></li>
              <li><a href="#" class="hover:underline">Subtítulo 3</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">Menú 2</h3>
            <ul>
              <li><a href="#" class="hover:underline">Subtítulo 1</a></li>
              <li><a href="#" class="hover:underline">Subtítulo 2</a></li>
              <li><a href="#" class="hover:underline">Subtítulo 3</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">Menú 3</h3>
            <ul>
              <li><a href="#" class="hover:underline">Subtítulo 1</a></li>
              <li><a href="#" class="hover:underline">Subtítulo 2</a></li>
              <li><a href="#" class="hover:underline">Subtítulo 3</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4" >Menú 4</h3>
            <ul>
              <li><a href="#" class="hover:underline">Subtítulo 1</a></li>
              <li><a href="#" class="hover:underline">Subtítulo 2</a></li>
              <li><a href="#" class="hover:underline">Subtítulo 3</a></li>
            </ul>
          </div>
        </div>

        <!-- Social Media Section -->
        <div class="flex justify-center space-x-4 mb-8">
          <a href="#" class="text-white hover:text-gray-400">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.324 1.325 1.324h21.351c.733 0 1.324-.591 1.324-1.324v-21.351c0-.733-.591-1.325-1.324-1.325zm-13.675 20.5h-3v-9h3v9zm-1.5-10.29c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.086-.914-2-2-2s-2 .914-2 2v4.5h-3v-9h3v1.5c.586-.896 1.586-1.5 2.5-1.5 1.933 0 3.5 1.567 3.5 3.5v5.5z"/>
            </svg>
          </a>
          <a href="#" class="text-white hover:text-gray-400">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.719 0-4.92 2.201-4.92 4.917 0 .386.044.762.127 1.124-4.087-.205-7.713-2.164-10.141-5.144-.423.725-.666 1.562-.666 2.457 0 1.694.863 3.188 2.175 4.065-.802-.026-1.558-.246-2.217-.616v.062c0 2.366 1.684 4.342 3.918 4.788-.41.111-.843.171-1.287.171-.315 0-.623-.031-.923-.088.624 1.951 2.432 3.374 4.576 3.414-1.676 1.313-3.791 2.097-6.086 2.097-.395 0-.785-.023-1.17-.068 2.169 1.391 4.743 2.204 7.514 2.204 9.025 0 13.965-7.479 13.965-13.965 0-.213-.005-.426-.014-.637.961-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </a>
          <a href="#" class="text-white hover:text-gray-400">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c-5.488 0-9.837 4.449-9.837 9.837 0 4.351 2.813 8.065 6.676 9.387-.092-.799-.176-2.031.037-2.906.191-.812 1.229-5.172 1.229-5.172s-.314-.628-.314-1.556c0-1.456.847-2.544 1.902-2.544.897 0 1.331.673 1.331 1.48 0 .902-.573 2.252-.868 3.506-.248 1.048.525 1.904 1.558 1.904 1.869 0 3.309-1.973 3.309-4.82 0-2.518-1.812-4.28-4.396-4.28-2.996 0-4.754 2.248-4.754 4.57 0 .902.346 1.872.779 2.4.086.104.098.195.073.3-.08.348-.26 1.048-.295 1.194-.046.191-.151.232-.348.14-1.297-.604-2.109-2.497-2.109-4.018 0-3.268 2.374-6.271 6.857-6.271 3.598 0 6.396 2.567 6.396 5.994 0 3.577-2.253 6.451-5.377 6.451-1.049 0-2.034-.544-2.372-1.188l-.646 2.457c-.234.891-.869 2.007-1.297 2.688.973.3 2.003.463 3.073.463 5.488 0 9.837-4.449 9.837-9.837 0-5.488-4.449-9.837-9.837-9.837z"/>
            </svg>
          </a>
          <a href="#" class="text-white hover:text-gray-400">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385-.113-.975-.213-2.475.045-3.535.234-.975 1.515-6.525 1.515-6.525s-.385-.77-.385-1.905c0-1.785 1.035-3.115 2.325-3.115 1.095 0 1.625.82 1.625 1.805 0 1.1-.7 2.75-1.065 4.275-.3 1.275.645 2.315 1.905 2.315 2.28 0 3.815-2.4 3.815-5.85 0-3.06-2.19-5.205-5.325-5.205-3.645 0-5.805 2.73-5.805 5.565 0 1.095.42 2.265.945 2.895.105.12.12.225.09.345-.09.375-.3 1.2-.345 1.38-.045.18-.15.21-.345.12-1.275-.6-2.07-2.49-2.07-4.005 0-3.27 2.37-6.27 6.855-6.27 3.6 0 6.39 2.565 6.39 5.985 0 3.57-2.25 6.45-5.37 6.45-1.05 0-2.03-.54-2.37-1.185l-.645 2.455c-.235.89-.87 2.005-1.3 2.685.975.3 2.005.465 3.075.465 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>

        <!-- Copyright Section -->
        <div class="text-center">
          <p>&copy; 2025 Mi Tienda. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import Header from '../components/Header.vue';
import Products from '../components/Products.vue';

export default {
  components: {
    Header,
    Products
  },
  data() {
    return {
      currentSlide: 0,
      currentTestimonial: 0,
      slides: [
        {
          title: 'Bienvenido a Nuestra Tienda de Comida',
          subtitle: 'Los Mejores Productos',
          description: 'Ofrecemos una amplia variedad de productos frescos y de alta calidad.',
          ctaText: 'Comprar Ahora',
          ctaLink: '#',
          image: 'images/header1.png'
        },
        {
          title: 'Descubre Nuestros Sabores',
          subtitle: 'Calidad y Frescura',
          description: 'Nuestros productos están seleccionados para ofrecerte lo mejor.',
          ctaText: 'Ingresar',
          ctaLink: '#',
          image: 'images/header2.png'
        }
      ],
      testimonials: [
        {
          text: 'Este es el mejor producto que he comprado. ¡Altamente recomendado!',
          author: 'Juan Pérez'
        },
        {
          text: 'La calidad es increíble y el servicio al cliente es excelente.',
          author: 'María López'
        },
        {
          text: 'Definitivamente volveré a comprar aquí. Muy satisfecho.',
          author: 'Carlos García'
        }
      ],
      products: [],
      cart: [],
      selectedCategory: null
    };
  },
  methods: {
    addToCart(product) {
      const cartItem = this.cart.find(item => item.id === product.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
    },
    fetchProductsByCategory(category) {
      // Aquí puedes hacer una llamada a la API para obtener los productos por categoría
      // Por ahora, vamos a simularlo con datos estáticos
      this.selectedCategory = category;
      this.products = [
        { id: 1, name: 'Producto 1', price: 100.00, image: '/path/to/product1.jpg' },
        { id: 2, name: 'Producto 2', price: 150.00, image: '/path/to/product2.jpg' },
        { id: 3, name: 'Producto 3', price: 200.00, image: '/path/to/product3.jpg' }
      ];
    },
    clearCategory() {
      this.selectedCategory = null;
      this.products = [];
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    nextTestimonial() {
      this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
    },
    prevTestimonial() {
      this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
    }
  },
  mounted() {
    setInterval(this.nextSlide, 5000); // Cambia de slide cada 5 segundos
    setInterval(this.nextTestimonial, 7000); // Cambia de testimonio cada 7 segundos
  },
  filters: {
    currency(value) {
      return `$${value.toFixed(2)}`;
    }
  }
};
</script>

<style>
@import 'tailwindcss/tailwind.css';

.hero-section {
  height: 100vh; /* Ajusta la altura para cubrir toda la pantalla */
}

.hero-slide {
  display: flex;
  width: 100%;
  height: 100%;
}

.hero-content {
  width: 50%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.hero-image {
  width: 50%;
  background-size: cover;
  background-position: center;
  height: 100%;
}

.testimonial-section {
  position: relative;
}

.testimonial-content {
  transition: transform 0.5s ease-in-out;
}

.testimonial-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border-radius: 50%;
  padding: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.testimonial-button-left {
  left: 1rem;
}

.testimonial-button-right {
  right: 1rem;
}
</style>