<template>
  <section class="stack">
    <button class="btn btn--ghost" @click="goBack">← Retour</button>

    <UiState v-if="loading || error" :loading="loading" :error="error" />

    <div v-else-if="movie" class="detail">
      <img class="detail__poster" :src="posterUrl" :alt="`Affiche de ${movie.Title}`" loading="lazy" />

      <div class="detail__content">
        <h1 class="detail__title">{{ movie.Title }}</h1>
        <p class="muted">{{ movie.Year }} • {{ movie.Runtime }} • {{ movie.Genre }}</p>

        <div class="chips">
          <span class="chip" v-if="movie.imdbRating && movie.imdbRating !== 'N/A'"> {{ movie.imdbRating }}/10</span>
          <span class="chip" v-if="movie.Type">{{ movie.Type }}</span>
          <span class="chip" v-if="movie.Rated && movie.Rated !== 'N/A'">{{ movie.Rated }}</span>
        </div>

        <h2>Synopsis</h2>
        <p>{{ safe(movie.Plot) }}</p>

        <div class="grid2">
          <div class="card"><h3>Réalisation</h3><p class="muted">{{ safe(movie.Director) }}</p></div>
          <div class="card"><h3>Acteurs</h3><p class="muted">{{ safe(movie.Actors) }}</p></div>
          <div class="card"><h3>Pays</h3><p class="muted">{{ safe(movie.Country) }}</p></div>
          <div class="card"><h3>Sortie</h3><p class="muted">{{ safe(movie.Released) }}</p></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMovieById } from "../services/omdb";
import UiState from "../components/UiState.vue";

const route = useRoute();
const router = useRouter();

const movie = ref(null);
const loading = ref(false);
const error = ref("");

const posterUrl = computed(() => {
  const p = movie.value?.Poster;
  return !p || p === "N/A"
    ? "https://via.placeholder.com/420x630?text=No+Poster"
    : p;
});

function safe(v) {
  return v && v !== "N/A" ? v : "—";
}

function goBack() {
  router.push("/");
}

onMounted(async () => {
  loading.value = true;
  try {
    movie.value = await getMovieById(route.params.id);
  } catch (e) {
    error.value = e?.message || "Erreur inconnue";
  } finally {
    loading.value = false;
  }
});
</script>
