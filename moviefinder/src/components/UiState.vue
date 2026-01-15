<template>
  <div class="state">
    <div v-if="loading" class="state__box">
      <div class="spinner" aria-hidden="true"></div>
      <p>Chargement…</p>
    </div>

    <div v-else-if="error" class="state__box state__box--error">
      <p><strong>Erreur :</strong> {{ error }}</p>
      <p class="muted small">Vérifie ta clé OMDb dans .env, puis relance le serveur.</p>
    </div>

    <div v-else-if="empty" class="state__box">
      <p>{{ emptyMessage }}</p>
      <p class="muted small">Essaie un autre mot-clé.</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  loading: { type: Boolean, default: false },
  error: { type: String, default: "" },
  empty: { type: Boolean, default: false },
  emptyMessage: { type: String, default: "Aucun résultat." },
});
</script>
