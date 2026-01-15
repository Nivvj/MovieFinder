<template>
  <div class="app">
    <header class="topbar">
      <div class="container topbar__inner">
        <RouterLink class="brand" to="/"> MovieFinder</RouterLink>
        <span class="muted small">Vue 3 • Pinia • Router • GitHub Pages</span>
      </div>
    </header>

    <main class="container main">
      <RouterView />
    </main>

    <footer class="footer">
      <div class="container footer__inner">
        <span class="muted">Trouver un film à regarder</span>
        <a class="link" href="https://www.omdbapi.com/" target="_blank" rel="noreferrer">OMDb API</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
