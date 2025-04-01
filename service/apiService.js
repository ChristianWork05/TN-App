import axios from 'axios';

// Configuración inicial de la API (por defecto KFC)
let apiClient = axios.create({
  baseURL: 'https://kfc.devolada.ec/api', // Base URL predeterminada
  headers: {
    'Content-Type': 'application/json'
  },
  maxBodyLength: Infinity
});

// Función para cambiar dinámicamente el baseURL
const setBaseURL = (baseURL) => {
  apiClient = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    maxBodyLength: Infinity
  });
};

export default {
  setBaseURL, // Exportamos la función para cambiar el baseURL

  getData() {
    return apiClient.get('/data');
  },
  getProducts() {
    return apiClient.get('/resto/product');
  },
  getCategoryData() {
    const data = JSON.stringify({
      query: ``,
      variables: {}
    });

    return apiClient.get('/resto/category/', {
      data: data
    });
  },
  login(email, password) {
    const data = JSON.stringify({
      email: email,
      password: password
    });

    return apiClient.post('/user/login', data);
  },
  register(name, lastname, ruc, rucType, phone, address, email, password, recaptchaToken) {
    const data = JSON.stringify({
      name: name,
      lastname: lastname,
      ruc: ruc,
      rucType: rucType,
      phone: phone,
      address: address,
      city: "MANTA", // Puedes parametrizar esto si es necesario
      state: "MANABÍ", // Puedes parametrizar esto si es necesario
      zip: "000000", // Puedes parametrizar esto si es necesario
      country: "EC", // Puedes parametrizar esto si es necesario
      email: email,
      password: password,
      token: recaptchaToken // Incluye el token de reCAPTCHA
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: '/user/register', // URL relativa
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    return apiClient.request(config)
      .then((response) => {
        console.log('Registro exitoso:', JSON.stringify(response.data));
        return response.data; // Devuelve los datos de la respuesta
      })
      .catch((error) => {
        console.error('Error en el registro:', error);
        throw error; // Lanza el error para que pueda ser manejado por el componente
      });
  },
  getBranches() {
    return apiClient.get('/resto/branches');
  }
};
