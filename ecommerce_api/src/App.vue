<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-black text-white p-4 shadow-md">
      <div class="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <router-link to="/" class="text-2xl font-bold hover:text-blue-200 transition-colors shrink-0 flex items-center">
          <span>
            <span class="text-yellow-400">Ponto</span><span class="text-red-800">Comum</span>
          </span>
        </router-link>
        
        <div class="w-full sm:w-auto sm:max-w-xs md:max-w-sm lg:max-w-md flex-grow">
          <SearchBar v-model="searchTerm" placeholder="Buscar produtos..." />
        </div>
      </div>
    </header>

    <main class="container mx-auto p-4 sm:p-8">
      <router-view />
    </main>

    <footer class="bg-black text-white text-center p-4 mt-8">
        <p>Valorizando o que é de <span class="text-yellow-400">todos</span>, para <span class="text-red-800">todos</span>.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SearchBar from './components/SearchBarComponent.vue'; 

const route = useRoute();
const router = useRouter();
const searchTerm = ref('');

watch(searchTerm, (newSearchTerm) => {
  if (newSearchTerm !== (route.query.search || '')) {
    const currentQuery = { ...route.query };
    if (newSearchTerm) {
      currentQuery.search = newSearchTerm;
    } else {
      delete currentQuery.search;
    }
    currentQuery.page = '1';
    router.push({ query: currentQuery });
  }
});

watch(() => route.query.search, (newSearchQueryFromRoute) => {
  const currentSearchTerm = newSearchQueryFromRoute || '';
  if (searchTerm.value !== currentSearchTerm) {
    searchTerm.value = currentSearchTerm;
  }
}, { immediate: true });
</script>
