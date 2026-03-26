
import { getShows, searchShows, getShowById } from "./service.js";
import { renderShows, renderShowDetail, renderFavorites } from "./ui.js";
import { getFavorites, toggleFavorite, addSearch, getHistory, clearHistory } from "./persistence.js";
import { isFavorite } from "./storage.js";
import { getState, setState } from "./state.js";

function handleFavoriteClick(show) {
  const isNowFavorite = toggleFavorite(show);

  console.log(
    isNowFavorite ? "Agregado a favoritos" : "Eliminado de favoritos"
  );
}

function checkIfFavorite(show) {
  return isFavorite(show.id);
}

function search(query) {
  addSearch(query);
  renderHistory();
  console.log("Buscando:", query);
}

function renderHistory() {
  const history = getHistory();
  console.log("Historial:", history);
}

function handleClearHistory() {
  clearHistory();
  renderHistory();
}

if (document.getElementById("cards")) {
  init();

  document.getElementById("searchInput")
    .addEventListener("input", async (e) => {
      const q = e.target.value;

      if (q) {
        const data = await searchShows(q);
        setState("shows", data.map(s => s.show));
      } else {
        const data = await getShows();
        setState("shows", data);
      }

      setState("page", 1);
      updateView();
    });

  document.getElementById("limitSelect")
    .addEventListener("change", (e) => {
      setState("limit", parseInt(e.target.value));
      setState("page", 1);
      updateView();
    });

  document.getElementById("prevBtn").onclick = () => changePage(-1);
  document.getElementById("nextBtn").onclick = () => changePage(1);
}

async function init() {
  const data = await getShows();
  setState("shows", data);
  setState("page", 1);
  setState("limit", 10); // valor por defecto
  updateView();
}

function updateView() {
  const shows = getState("shows") || [];
  const page = getState("page") || 1;
  const limit = getState("limit") || 10;

  const start = (page - 1) * limit;
  const paginated = shows.slice(start, start + limit);

  renderShows(paginated);

  document.getElementById("pageInfo").textContent =
    `Página ${page}`;
}

function changePage(step) {
  const page = getState("page");
  const shows = getState("shows");
  const limit = getState("limit");

  const maxPage = Math.ceil(shows.length / limit);
  const newPage = page + step;

  if (newPage >= 1 && newPage <= maxPage) {
    setState("page", newPage);
    updateView();
  }
}

if (document.getElementById("detail")) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  loadDetail(id);
}

async function loadDetail(id) {
  const show = await getShowById(id);
  renderShowDetail(show);
}

if (document.getElementById("favorites")) {
  const favs = getFavorites();
  renderFavorites(favs);
}
