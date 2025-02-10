<template>
    <div>
      <NuxtLink to="/LandingPage">Ir a la Landing Principal</NuxtLink>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      this.$router.push('/LandingPage');
    }
  }
  </script>
  
  <style>
  @import 'tailwindcss/tailwind.css';
  </style>