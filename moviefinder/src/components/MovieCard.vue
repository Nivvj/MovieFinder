<template>
  <RouterLink class="movie" :to="`/movie/${movie.imdbID}`">
    <img class="movie__poster" :src="posterUrl" :alt="`Affiche de ${movie.Title}`" loading="lazy" />
    <div class="movie__body">
      <h3 class="movie__title" :title="movie.Title">{{ movie.Title }}</h3>
      <p class="muted small">{{ movie.Year }} • {{ movie.Type }}</p>
    </div>
  </RouterLink>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  movie: { type: Object, required: true },
});

const posterUrl = computed(() => {
  const p = props.movie?.Poster;
  return !p || p === "N/A"
    ? "https://via.placeholder.com/300x450?text=No+Poster"
    : p;
});
</script>
