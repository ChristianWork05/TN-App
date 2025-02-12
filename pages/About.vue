<!-- pages/About.vue -->
<template>
    <div>
      <h1 class="text-3xl font-bold">Acerca de Nosotros</h1>
      <Button @click="fetchData">Click Me</Button>
      <div v-if="data">
        <p>{{ data }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import Button from '~/components/Button.vue';
  import apiService from '~/service/apiService';
  
  export default {
    components: {
      Button
    },
    data() {
      return {
        data: null
      };
    },
    methods: {
      async fetchData() {
        try {
          const response = await apiService.getData();
          this.data = response.data;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    }
  }
  </script>
  
  <style>
  @import 'tailwindcss/tailwind.css';
  </style>