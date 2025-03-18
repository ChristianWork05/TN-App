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
  login(email, password) {
    const data = JSON.stringify({
      email: email,
      password: password
    });

    return apiClient.post('/user/login', data);
  },
  register(name, lastname, ruc, rucType, phone, address, city, state, zip, country, email, password) {
    const token = localStorage.getItem('userToken'); // Obtener el token del almacenamiento local
    const data = JSON.stringify({
      name: name,
      lastname: lastname,
      ruc: ruc,
      rucType: rucType,
      phone: phone,
      address: address,
      city: city,
      state: state,
      zip: zip,
      country: country,
      email: email,
      password: password,
      token: token
    });

    return apiClient.post('/user/register', data);
  },
  getBranches() {
    return apiClient.get('/resto/branches');
  }
}
