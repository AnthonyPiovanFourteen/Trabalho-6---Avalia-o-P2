<template>
  <div class="home-view">
    <div class="flex justify-end items-center mb-6">
      <SortDropdown v-model="opcao_ord" />
    </div>

    <div v-if="carregando" class="text-center py-10">
      <svg class="animate-spin h-8 w-8 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-lg text-gray-600 mt-2">Carregando produtos...</p>
    </div>
    <div v-else-if="erro_msg" class="text-center py-10 bg-red-50 p-6 rounded-lg">
      <p class="text-lg text-red-700 font-semibold">Oops! Algo deu errado.</p>
      <p class="text-md text-red-600">{{ erro_msg }}</p>
      <button @click="buscar_produtos(true)" class="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
        Tentar Novamente
      </button>
    </div>
    <div v-else-if="lista_produtos.length === 0 && !carregando" class="text-center py-10 bg-yellow-50 p-6 rounded-lg">
      <p class="text-lg text-yellow-700 font-semibold">Nenhum produto encontrado.</p>
      <p class="text-md text-yellow-600">Tente ajustar seus filtros ou termos de busca.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      <ProductCard
        v-for="produto_item in prods_ordenados" 
        :key="produto_item.id"
        :item_produto="produto_item"/> 
    </div>

    <PaginacaoComponent 
      :pag_atual="pag_atual"
      :total_pag="total_pags"
      :max_botoes="7"
      @pagina-alterada="ao_mudar_pagina"
      v-if="lista_produtos.length > 0 && total_pags > 1"/>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import api from '../services/api';
import ProductCard from '../components/ProductCardComponent.vue';
import PaginacaoComponent from '../components/PaginationComponent.vue';
import SortDropdown from '../components/SortDropdownComponent.vue';
import { useRoute, useRouter } from 'vue-router';

const rota = useRoute(); 
const roteador = useRouter(); 

const lista_produtos = ref([]);
const carregando = ref(true);
const erro_msg = ref(null);

const pag_atual = ref(1);
const itens_por_pag = ref(12);
const total_prods = ref(0);

const termo_busca = ref('');
const opcao_ord = ref('');

const total_pags = computed(() => {
  return Math.ceil(total_prods.value / itens_por_pag.value);
});

const buscar_produtos = async (eh_retry = false) => {
  if (!erro_msg.value) {
    carregando.value = true;
  }
  if (eh_retry) {
      erro_msg.value = null;
      carregando.value = true;
  }

  const params_q = {};
  if (pag_atual.value > 1) params_q.page = pag_atual.value;
  if (termo_busca.value) params_q.search = termo_busca.value;
  if (opcao_ord.value) params_q.sort = opcao_ord.value;

  const query_rota_atual = { ...rota.query };
  let query_mudou = Object.keys(params_q).length !== Object.keys(query_rota_atual).length;
  if (!query_mudou) {
    for (const chave in params_q) { 
      if (String(params_q[chave]) !== String(query_rota_atual[chave])) {
        query_mudou = true;
        break;
      }
    }
    if (Object.keys(params_q).length === 0 && Object.keys(query_rota_atual).length > 0 && (query_rota_atual.page || query_rota_atual.search || query_rota_atual.sort) ) {
        query_mudou = true;
    }
  }

  if (query_mudou) {
    roteador.replace({ query: params_q }).catch(err => {
       if (err.name !== 'NavigationDuplicated' && !err.message.includes('Avoided redundant navigation')) {
           console.warn('Aviso de navegação do roteador:', err.message);
       }
    });
  }

  try {
    const pular_itens = (pag_atual.value - 1) * itens_por_pag.value;

    if (termo_busca.value) {
      const res_busca = await api.searchProducts(termo_busca.value);
      total_prods.value = res_busca.data.total;
      const todos_prods_enc = res_busca.data.products;
      lista_produtos.value = todos_prods_enc.slice(pular_itens, pular_itens + itens_por_pag.value);
    } else {
      const res_prods = await api.getProducts(itens_por_pag.value, pular_itens);
      total_prods.value = res_prods.data.total;
      lista_produtos.value = res_prods.data.products;
    }
    erro_msg.value = null;

  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    erro_msg.value = 'Não foi possível carregar os produtos. Verifique sua conexão ou tente mais tarde.';
    lista_produtos.value = [];
    total_prods.value = 0;
  } finally {
    carregando.value = false;
  }
};

const prods_ordenados = computed(() => {
  const arr_prods = [...lista_produtos.value];
  switch (opcao_ord.value) {
    case 'price-asc': return arr_prods.sort((a, b) => a.price - b.price);
    case 'price-desc': return arr_prods.sort((a, b) => b.price - a.price);
    case 'name-asc': return arr_prods.sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc': return arr_prods.sort((a, b) => b.title.localeCompare(a.title));
    default: return arr_prods;
  }
});

watch(() => rota.query, (nova_q) => {
  const nova_pag = parseInt(nova_q.page) || 1;
  const nova_b = nova_q.search || '';
  const nova_o = nova_q.sort || '';

  if (nova_b !== termo_busca.value) termo_busca.value = nova_b;
  if (nova_o !== opcao_ord.value) opcao_ord.value = nova_o;
  if (nova_pag !== pag_atual.value) pag_atual.value = nova_pag;
  
}, { deep: true, immediate: true });


watch(termo_busca, (nova_val, val_antigo) => {
  if (nova_val !== val_antigo || (val_antigo === undefined && nova_val !== '')) {
    if (pag_atual.value !== 1) {
      pag_atual.value = 1;
    } else {
      buscar_produtos();
    }
  }
});

watch(opcao_ord, (nova_val, val_antigo) => {
  if (nova_val !== val_antigo || (val_antigo === undefined && nova_val !== '')) {
    if (pag_atual.value !== 1) {
      pag_atual.value = 1;
    } else {
      buscar_produtos();
    }
  }
});

watch(pag_atual, (nova_val, val_antigo) => {
  if (nova_val !== val_antigo && val_antigo !== undefined) {
    buscar_produtos();
  }
});

onMounted(() => {
  buscar_produtos();
});

const ao_mudar_pagina = (num_pag) => {
  if (num_pag !== pag_atual.value) {
    pag_atual.value = num_pag;
  }
};
</script>