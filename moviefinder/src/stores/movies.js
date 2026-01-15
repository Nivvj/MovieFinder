import { defineStore } from "pinia";
import { searchMovies } from "../services/omdb";

export const useMoviesStore = defineStore("movies", {
  state: () => ({
    query: "",
    type: "movie",
    page: 1,
    results: [],
    totalResults: 0,
    loading: false,
    error: "",
    lastSearched: "",
  }),
  getters: {
    totalPages(state) {
      return Math.ceil((state.totalResults || 0) / 10);
    },
    hasResults(state) {
      return state.results.length > 0;
    },
  },
  actions: {
    setQuery(v) {
      this.query = v;
    },
    setType(v) {
      this.type = v;
    },
    resetPagination() {
      this.page = 1;
    },
    async fetchSearch() {
      const q = this.query.trim();
      this.error = "";
      this.results = [];
      this.totalResults = 0;

      if (!q) {
        this.lastSearched = "";
        return;
      }

      this.loading = true;
      try {
        const data = await searchMovies({ query: q, page: this.page, type: this.type });
        this.results = data.Search || [];
        this.totalResults = Number(data.totalResults || 0);
        this.lastSearched = q;
      } catch (e) {
        this.error = e?.message || "Erreur inconnue";
      } finally {
        this.loading = false;
      }
    },
    async nextPage() {
      if (this.page < this.totalPages) {
        this.page += 1;
        await this.fetchSearch();
      }
    },
    async prevPage() {
      if (this.page > 1) {
        this.page -= 1;
        await this.fetchSearch();
      }
    },
    async goToPage(p) {
      const n = Number(p);
      if (!Number.isFinite(n)) return;
      if (n < 1 || n > this.totalPages) return;
      this.page = n;
      await this.fetchSearch();
    },
  },
});
