<template>
  <div class="product-detail-view p-2 md:p-4">
    <div v-if="isLoading" class="text-center py-20">
      <svg class="animate-spin h-10 w-10 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-xl text-gray-600 mt-3">Carregando detalhes do produto...</p>
    </div>
    <div v-else-if="error" class="text-center py-20 bg-red-50 p-6 rounded-lg">
      <p class="text-xl text-red-700 font-semibold">{{ error }}</p>
      <router-link to="/" class="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"> Voltar para a Loja </router-link>
    </div>
    <div v-else-if="product" class="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      <div class="md:flex">
        <div class="md:w-1/2 p-4">
          <img v-if="product.thumbnail" :src="product.thumbnail" :alt="product.title" class="w-full h-auto md:max-h-[500px] object-contain rounded-lg border border-gray-200">
        </div>
        <div class="md:w-1/2 p-6 md:p-8">
          <p v-if="product.category" class="text-sm text-gray-500 mb-1 uppercase tracking-wide">{{ product.category }}</p>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{{ product.title }}</h1>
          <p v-if="product.brand" class="text-gray-600 text-sm mb-4">Marca: <span class="font-semibold text-gray-700">{{ product.brand }}</span></p>
          <div class="mb-4">
            <span class="text-3xl font-extrabold text-blue-600">${{ product.price?.toFixed(2) }}</span>
            <span v-if="product.discountPercentage > 0" class="ml-2 text-sm text-gray-500 line-through"> ${{ (product.price / (1 - product.discountPercentage / 100))?.toFixed(2) }}
            </span>
            <span v-if="product.discountPercentage > 0" class="ml-2 text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
              {{ product.discountPercentage?.toFixed(0) }}% OFF </span>
          </div>
          <div class="mb-4 flex items-center" v-if="typeof product.rating === 'number'">
            <span class="text-yellow-500 flex items-center">
              <svg v-for="i in 5" :key="i" class="w-5 h-5" :class="i <= Math.round(product.rating) ? 'fill-current' : 'text-gray-300 fill-current'" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            </span>
            <span class="ml-2 text-sm text-gray-600">({{ product.rating.toFixed(1) }}/5)</span>
          </div>
          <div class="mb-6">
            <p v-if="product.stock > 0" class="text-md font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full inline-block">Em estoque: {{ product.stock }} unidades</p>
            <p v-else class="text-md font-semibold text-red-700 bg-red-100 px-3 py-1 rounded-full inline-block">Produto indisponível</p>
          </div>
          <h2 class="text-lg font-semibold text-gray-800 mt-6 mb-2">Descrição</h2>
          <p class="text-gray-700 mb-4 leading-relaxed text-sm">{{ product.description }}</p>
          <div class="mt-8">
            <router-link to="/" class="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"> &larr; Voltar para a lista de produtos </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-20">
      <p class="text-xl text-gray-600">Detalhes do produto não disponíveis.</p>
    </div>
  </div>
</template>
<script setup>
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import api from '../services/api';
  
  const route = useRoute();
  const product = ref(null);
  const isLoading = ref(true);
  const error = ref(null);
  
  const fetchProductDetails = async (productId) => {
    isLoading.value = true;
    error.value = null;
    product.value = null;
  
    try {
      const response = await api.getProductById(productId);
      product.value = response.data;
    } catch (err) {
      console.error('Erro ao buscar detalhes do produto:', err);
      if (err.response && err.response.status === 404) {
        error.value = 'Produto não encontrado.';
      } else {
        error.value = 'Não foi possível carregar os detalhes do produto.';
      }
    } finally {
      isLoading.value = false;
    }
  };
  
  watch(() => route.params.id, (newId) => {
    if (newId) {
      fetchProductDetails(newId);
    }
  }, { immediate: true });
</script>