<template>
  <div class="border rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
    <router-link :to="{ name: 'ProductDetail', params: { id: item_produto.id } }" class="flex flex-col h-full">
      <div class="relative w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img :src="item_produto.thumbnail" :alt="item_produto.title" class="object-contain max-w-full max-h-full">
      </div>
      <div class="p-4 flex flex-col flex-grow">
        <h3 class="text-md font-semibold mb-1 truncate" :title="item_produto.title">{{ item_produto.title }}</h3>
        <p class="text-xs text-gray-500 mb-2 capitalize">{{ item_produto.category }}</p>
        <div class="mt-auto">
          <p class="text-lg font-bold text-blue-600 mb-2">${{ item_produto.price.toFixed(2) }}</p>
          <p v-if="item_produto.stock > 0" class="text-xs text-green-600">Em estoque: {{ item_produto.stock }}</p>
          <p v-else class="text-xs text-red-600">Fora de estoque</p>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script setup>
  defineProps({
    item_produto: { 
      type: Object,
      required: true,
    },
  });
</script>
<style scoped>
  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>