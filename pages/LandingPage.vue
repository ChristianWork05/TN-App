<template>
  <div class="hero-section bg-cover bg-center h-screen flex items-center justify-center" style="background-image: url('/images/background-image.png');">
    <div class="bg-white bg-opacity-75 p-8 rounded-lg text-center">
      <h1 class="text-4xl font-bold mb-4">Bienvenidos a Nuestro Restaurante</h1>
      <p class="text-xl mb-6">Disfruta de la mejor comida en un ambiente acogedor</p>
      <div class="flex justify-center space-x-4">
        <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">CONTACTANOS</button>
        <button @click="goToMenu" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">MENU</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  methods: {
    goToMenu() {
      this.$router.push('/menu');
    }
  }
}
</script>

<style scoped>
.hero-section {
  background-image: url('/images/background-image.png');
}
</style>