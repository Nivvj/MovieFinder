<template>
  <section class="stack">
    <div class="hero">
      <h1>Recherche de films / séries</h1>
      <p class="muted">Ex: Batman, Inception, Matrix…</p>
    </div>

    <SearchBar
      :model-value="store.query"
      :type="store.type"
      :loading="store.loading"
      @update:modelValue="onQueryChange"
      @update:type="onTypeChange"
      @submit="onSubmit"
    />

    <UiState
      v-if="store.loading || store.error || emptyState"
      :loading="store.loading"
      :error="store.error"
      :empty="emptyState"
      :empty-message="`Aucun résultat pour “${store.lastSearched}”.`"
    />

    <MovieList v-else :movies="store.results" />

    <Pagination
      v-if="store.hasResults && store.totalPages > 1 && !store.loading"
      :page="store.page"
      :total-pages="store.totalPages"
      @prev="store.prevPage"
      @next="store.nextPage"
      @go="store.goToPage"
    />
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useMoviesStore } from "../stores/movies";
import SearchBar from "../components/SearchBar.vue";
import MovieList from "../components/MovieList.vue";
import Pagination from "../components/Pagination.vue";
import UiState from "../components/UiState.vue";

const store = useMoviesStore();

const emptyState = computed(() => {
  return !!store.lastSearched && !store.loading && !store.error && store.results.length === 0;
});

function onQueryChange(v) {
  store.setQuery(v);
  store.resetPagination();
}

function onTypeChange(v) {
  store.setType(v);
  store.resetPagination();
}

async function onSubmit() {
  store.resetPagination();
  await store.fetchSearch();
}
</script>
