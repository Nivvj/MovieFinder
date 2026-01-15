<template>
  <div class="pager">
    <button class="btn btn--ghost" :disabled="page <= 1" @click="$emit('prev')">← Précédent</button>

    <div class="pager__mid">
      <span class="muted small">Page</span>
      <input class="input input--small" type="number" :value="page" min="1" :max="totalPages" @change="onGo" />
      <span class="muted small">/ {{ totalPages }}</span>
    </div>

    <button class="btn btn--ghost" :disabled="page >= totalPages" @click="$emit('next')">Suivant →</button>
  </div>
</template>

<script setup>
defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true },
});

const emit = defineEmits(["prev", "next", "go"]);
function onGo(e) {
  emit("go", e.target.value);
}
</script>
