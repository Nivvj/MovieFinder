<template>
  <div class="grid">
    <MovieCard v-for="m in movies" :key="m.imdbID" :movie="m" />
  </div>
</template>

<script setup>
import MovieCard from "./MovieCard.vue";

defineProps({
  movies: { type: Array, default: () => [] },
});
</script>
