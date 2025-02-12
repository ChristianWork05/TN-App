<!-- components/Button.vue -->
<template>
    <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    name: 'Button'
  }
  </script>
  
  <style>
  @import 'tailwindcss/tailwind.css';
  </style>