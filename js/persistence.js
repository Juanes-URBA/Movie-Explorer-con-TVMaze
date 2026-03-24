import {
  addFavorite,
  removeFavorite,
  isFavorite,
  getFavorites,
  saveSearch,
  getSearchHistory,
  clearSearchHistory,
  getSettings,
  saveSettings,
} from "./storage.js";

export function toggleFavorite(show) {
  if (isFavorite(show.id)) {
    removeFavorite(show.id);
    return false;
  } else {
    addFavorite(show);
    return true;
  }
}

export function getFavoritesList() {
  return getFavorites();
}

export function addSearch(query) {
  if (query && query.trim() !== "") {
    saveSearch(query);
  }
}

export function getHistory() {
  return getSearchHistory();
}

export function clearHistory() {
  clearSearchHistory();
}

export function updatePerPage(value) {
  const settings = getSettings();
  settings.perPage = Number(value);
  saveSettings(settings);
}

export function toggleTheme() {
  const settings = getSettings();
  settings.theme = settings.theme === "light" ? "dark" : "light";
  saveSettings(settings);
  return settings.theme;
}

export function filterByGenre(shows, genre) {
  if (!genre) return shows;

  return shows.filter((show) => show.genres?.includes(genre));
}

export function filterByGenres(shows, genres) {
  if (!genres || genres.length === 0) return shows;

  return shows.filter((show) => genres.every((g) => show.genres?.includes(g)));
}
