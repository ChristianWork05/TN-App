import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://backend.devolada.ec/api', // Reemplaza con la URL de tu API
  headers: {
    'Content-Type': 'application/json'
  },
  maxBodyLength: Infinity
});

export default {
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
}