<template>
  <nav aria-label="Paginação" v-if="total_pag > 1" class="flex justify-center items-center space-x-1 sm:space-x-2 my-8">
    <button @click="mudar_pag(pag_atual - 1)" :disabled="pag_atual === 1" class="px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> Anterior </button>
    <template v-for="(item_pag, indice) in paginas_exibir" :key="item_pag + '-' + indice">
      <button v-if="typeof item_pag === 'number'" @click="mudar_pag(item_pag)" :class="[
          'px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium border rounded-md',
          pag_atual === item_pag
            ? 'bg-blue-600 text-white border-blue-600'
            : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50']">
        {{ item_pag }}
      </button>
      <span v-else class="px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-500">
        {{ item_pag }}
      </span>
    </template>
    <button @click="mudar_pag(pag_atual + 1)" :disabled="pag_atual === total_pag" class="px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> Próxima </button>
  </nav>
</template>
<script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    pag_atual: { type: Number, required: true },
    total_pag: { type: Number, required: true },
    max_botoes: { type: Number, default: 7 }
  });
  
  const emit = defineEmits(['pagina-alterada']);
  
  const mudar_pag = (num_pag) => {
    if (num_pag >= 1 && num_pag <= props.total_pag && num_pag !== props.pag_atual) {
      emit('pagina-alterada', num_pag);
    }
  };
  
  const paginas_exibir = computed(() => {
    if (props.total_pag <= props.max_botoes) {
       return Array.from({length: props.total_pag}, (_, i) => i + 1);
    }
    const larg_lat = Math.max(1, Math.floor((props.max_botoes - 3) / 2)); 
    const arr_pag = []; 
    
    arr_pag.push(1);
    if (props.pag_atual > larg_lat + 2) {
      arr_pag.push("...");
    }
  
    for (let i = Math.max(2, props.pag_atual - larg_lat); i <= Math.min(props.total_pag - 1, props.pag_atual + larg_lat); i++) {
      if (!arr_pag.includes(i)) { 
          arr_pag.push(i);
      }
    }
  
    if (props.pag_atual < props.total_pag - larg_lat - 1) { 
      arr_pag.push("...");
    }
    
    if (props.total_pag > 1 && !arr_pag.includes(props.total_pag)) {
      arr_pag.push(props.total_pag);
    }
  
    return arr_pag.filter((item, indice, proprio_arr) => {
      if (item === "..." && proprio_arr[indice - 1] === "...") return false;
      if (item === "..." && typeof proprio_arr[indice - 1] === 'number' && typeof proprio_arr[indice + 1] === 'number' && proprio_arr[indice + 1] - proprio_arr[indice - 1] <= 1) return false;
      return true;
    });
  });
</script>