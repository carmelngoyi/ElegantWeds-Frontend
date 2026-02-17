import React, { useState, useEffect } from "react";
import { Heart, Trash2 } from "lucide-react";
import "./Favourites.css";
import { getFavorites, toggleFavorite } from "../Favourite.js";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL;

        // Fetch everything
        const [dressRes, accessoryRes] = await Promise.all([
          fetch(`${API_BASE}/dresses`),
          fetch(`${API_BASE}/accessories`)
        ]);

        const dresses = await dressRes.json();
        const accessories = await accessoryRes.json();

        const allItems = [
          ...dresses.map(d => ({ ...d, type: "dress" })),
          ...accessories.map(a => ({ ...a, type: "accessory" }))
        ];

        const favoriteIds = getFavorites();

        const matched = allItems.filter(item =>
          favoriteIds.includes(item._id)
        );

        setFavorites(matched);
      } catch (error) {
        console.error("Failed to load favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
    window.addEventListener("favoritesUpdated", loadFavorites);

    return () => {
      window.removeEventListener("favoritesUpdated", loadFavorites);
    };
  }, []);

  const handleRemove = (id) => {
    toggleFavorite(id);
    setFavorites(prev => prev.filter(item => item._id !== id));
  };

  if (isLoading) {
    return <div className="loading-message">Loading your dream list...</div>;
  }

  return (
    <div className="favorites-page-container">
      <main className="favorites-main-content">

        <h1 className="page-title">Your Favorites ✨</h1>

        {favorites.length === 0 ? (
          <div className="empty-message">
            <Heart size={40} color="#ccc" />
            <p>Your favorites list is empty.</p>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map(item => (
              <div key={item._id} className="favorite-card">

                <img
                  src={item.image_placeholder_url || item.image}
                  alt={item.name}
                  className="favorite-image"
                />

                <div className="favorite-info">
                  <h3>{item.name}</h3>
                  <p>{item.type.toUpperCase()}</p>
                  <p>{item.price_range}</p>

                  <button
                    className="remove-button"
                    onClick={() => handleRemove(item._id)}
                  >
                    <Trash2 size={18} /> Remove
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default Favorites;
