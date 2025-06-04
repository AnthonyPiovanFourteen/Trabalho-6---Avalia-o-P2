<template>
  <div class="w-full md:w-auto">
    <label for="sort-options" class="sr-only">Ordenar por:</label>
    <select id="sort-options" :value="modelValue" @change="onChange" class="block w-full pl-3 pr-10 py-2.5 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm">
      <option value="">Ordenar por: Padrão</option>
      <option value="price-asc">Preço: Crescente</option>
      <option value="price-desc">Preço: Decrescente</option>
      <option value="name-asc">Nome: A-Z</option>
      <option value="name-desc">Nome: Z-A</option>
    </select>
  </div>
</template>
<script setup>
  defineProps({
    modelValue: String,
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const onChange = (event) => {
    emit('update:modelValue', event.target.value);
  };
</script>