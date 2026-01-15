const BASE_URL = import.meta.env.VITE_OMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

console.log("ENV KEY =", import.meta.env.VITE_OMDB_API_KEY);
console.log("ENV URL =", import.meta.env.VITE_OMDB_BASE_URL);

function assertEnv() {
  if (!API_KEY) throw new Error("Clé OMDb manquante (.env : VITE_OMDB_API_KEY)");
  if (!BASE_URL) throw new Error("Base URL manquante (.env : VITE_OMDB_BASE_URL)");
}

async function request(params) {
  assertEnv();
  const url = new URL(BASE_URL);
  url.searchParams.set("apikey", API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();

  if (data?.Response === "False") throw new Error(data?.Error || "Erreur API");
  return data;
}

export async function searchMovies({ query, page = 1, type = "movie" }) {
  const params = { s: query, page };
  if (type) params.type = type; // movie | series | episode | ""
  return request(params);
}

export async function getMovieById(id) {
  return request({ i: id, plot: "full" });
}
