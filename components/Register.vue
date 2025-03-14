<template>
    <div class="register-container">
      <h2>Registro de Usuario</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-content">
          <div>
            <label for="name">Nombre</label>
            <input type="text" v-model="form.name" id="name" required />
          </div>
          <div>
            <label for="lastname">Apellido</label>
            <input type="text" v-model="form.lastname" id="lastname" required />
          </div>
          <div>
            <label for="ruc">RUC</label>
            <input type="text" v-model="form.ruc" id="ruc" required />
          </div>
          <div>
            <label for="phone">Teléfono</label>
            <input type="text" v-model="form.phone" id="phone" required />
          </div>
          <div>
            <label for="address">Dirección</label>
            <input type="text" v-model="form.address" id="address" required />
          </div>
          <div>
            <label for="email">Correo Electrónico</label>
            <input type="email" v-model="form.email" id="email" required />
          </div>
          <div>
            <label for="password">Contraseña</label>
            <input type="password" v-model="form.password" id="password" required />
          </div>
        </div>
        <button type="submit" class="register-button">Registrar</button>
      </form>
    </div>
  </template>
  
  <script>
  import apiService from '../service/apiService';
  
  export default {
    data() {
      return {
        form: {
          name: '',
          lastname: '',
          ruc: '',
          phone: '',
          address: '',
          email: '',
          password: ''
        }
      };
    },
    methods: {
      async handleRegister() {
        try {
          const response = await apiService.register(
            this.form.name,
            this.form.lastname,
            this.form.ruc,
            this.form.phone,
            this.form.address,
            this.form.email,
            this.form.password
          );
          console.log('Registro exitoso:', response.data);
          // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
        } catch (error) {
          console.error('Error en el registro:', error);
          // Aquí puedes mostrar un mensaje de error al usuario
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }
  
  .register-container h2 {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .register-container form {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  .form-content {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 1rem;
  }
  
  .register-container form div {
    margin-bottom: 0.5rem;
  }
  
  .register-container label {
    display: block;
    margin-bottom: 0.25rem;
  }
  
  .register-container input {
    width: 100%;
    padding: 0.25rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .register-button {
    padding: 0.75rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: auto;
  }
  
  .register-button:hover {
    background-color: #0056b3;
  }
  </style>