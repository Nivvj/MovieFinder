<template>
  <form class="search" @submit.prevent="onSubmit">
    <div class="search__row">
      <input
        class="input"
        type="text"
        :value="modelValue"
        placeholder="Rechercher… (ex: Batman)"
        @input="onInput"
      />

      <select
        class="select"
        :value="type"
        @change="emit('update:type', $event.target.value)"
      >
        <option value="movie">Films</option>
        <option value="series">Séries</option>
        <option value="episode">Épisodes</option>
        <option value="">Tous</option>
      </select>

      <button class="btn" type="submit" :disabled="loading || !modelValue.trim()">
        {{ loading ? "Recherche..." : "Rechercher" }}
      </button>
    </div>

    <p class="muted small">Cliquer sur une carte pour voir le détail.</p>
  </form>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: "" },
  type: { type: String, default: "movie" },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "update:type", "submit"]);

let timeoutId = null;

function onInput(e) {
  const value = e.target.value;
  clearTimeout(timeoutId);

  // debounce simple
  timeoutId = setTimeout(() => {
    emit("update:modelValue", value);
  }, 300);
}

function onSubmit() {
  emit("submit");
}
</script>
