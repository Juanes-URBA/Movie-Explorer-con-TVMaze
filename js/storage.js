const FAVORITES_KEY = "favorites";
const SEARCH_KEY = "search_history";
const SETTINGS_KEY = "settings";

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(id) {
  return getFavorites().some((fav) => fav.id === id);
}

export function addFavorite(show) {
  const favorites = getFavorites();

  if (!isFavorite(show.id)) {
    favorites.push(show);
    saveFavorites(favorites);
  }
}

export function removeFavorite(id) {
  const updated = getFavorites().filter((fav) => fav.id !== id);
  saveFavorites(updated);
}

export function getSearchHistory() {
  try {
    return JSON.parse(localStorage.getItem(SEARCH_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveSearch(query) {
  let history = getSearchHistory();

  query = query.trim().toLowerCase();

  history = history.filter((item) => item !== query);

  history.unshift(query);

  history = history.slice(0, 10);

  localStorage.setItem(SEARCH_KEY, JSON.stringify(history));
}

export function clearSearchHistory() {
  localStorage.removeItem(SEARCH_KEY);
}

export function getSettings() {
  return (
    JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {
      perPage: 10,
      theme: "light",
    }
  );
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
