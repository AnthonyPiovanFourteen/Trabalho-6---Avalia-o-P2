<template>
  <div class="w-full">
    <input
      type="text"
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900" 
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: 'Buscar produtos...'
  }
});

const emit = defineEmits(['update:modelValue']);

let debounceTimer = null;

const onInput = (event) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    emit('update:modelValue', event.target.value);
  }, 400);
};
</script>