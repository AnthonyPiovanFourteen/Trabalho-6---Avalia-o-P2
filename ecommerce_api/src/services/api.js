import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getProducts(limit = 10, skip = 0) {
    return apiClient.get(`/products?limit=${limit}&skip=${skip}`);
  },
  getProductById(id) {
    return apiClient.get(`/products/${id}`);
  },
  searchProducts(query) {
    return apiClient.get(`/products/search?q=${query}`);
  },
};