import {
  toggleFavorite,
  addSearch,
  getHistory,
  clearHistory,
} from "./persistence.js";

import { isFavorite } from "./storage.js";

function handleFavoriteClick(show) {
  const isNowFavorite = toggleFavorite(show);

  console.log(
    isNowFavorite ? "Agregado a favoritos" : "Eliminado de favoritos",
  );
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

function checkIfFavorite(show) {
  return isFavorite(show.id);
}
