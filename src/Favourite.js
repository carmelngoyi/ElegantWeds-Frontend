const FAVORITES_KEY = 'elegantWedsFavorites';

// Gets the current list of favorite IDs from Local Storage
export const getFavorites = () => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

// Toggles the favorite status for a given item ID
export const toggleFavorite = (itemId) => {
  let favorites = getFavorites();
  const index = favorites.indexOf(itemId);

  if (index > -1) {
    // Item is favorited, so remove it
    favorites.splice(index, 1);
  } else {
    // Item is not favorited, so add it
    favorites.push(itemId);
  }
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  // Dispatch a custom event to notify other components (like the Favorites page)
  window.dispatchEvent(new CustomEvent('favoritesUpdated', { detail: favorites }));
  
  return index === -1; 
  // returns true if added, false if removed
};

// Checks if an item is currently favorited
export const isFavorite = (itemId) => {
  return getFavorites().includes(itemId);
};