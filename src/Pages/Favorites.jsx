import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import './Favourites.css'; 
import { getFavorites, toggleFavorite, isFavorite } from "../Favourite.js";

const FAVORITES_KEY = 'elegantWedsFavorites';

// const getFavorites = () => {
//   const favorites = localStorage.getItem(FAVORITES_KEY);
//   return favorites ? JSON.parse(favorites) : [];
// };

// const toggleFavorite = (itemId) => {
//   let favorites = getFavorites();
//   const index = favorites.indexOf(itemId);

//   if (index > -1) {
//     favorites.splice(index, 1);
//   } else {
//     favorites.push(itemId);
//   }
  
//   localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
//   window.dispatchEvent(new CustomEvent('favoritesUpdated', { detail: favorites }));
  
//   return index === -1;
// };



const fetchItemDetails = async (id, type) => {
    try {
        const API_BASE = import.meta.env.VITE_API_URL;
        const endpoint = type === 'dress' ? `/dresses/${id}` : `/accessories/${id}`; 
        
       return {
            _id: id,
            name: `${type} item ${id}`,
            type: type,
            price_range: 'R35000 - R70000',
            image_placeholder_url: 'path/to/placeholder-image.jpg',
            // ... other details
        };

    } catch (error) {
        console.error(`Failed to fetch ${type} details for ${id}:`, error);
        return null;
    }
};


const Favorites = () => {
    const [favoritedItems, setFavoritedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // This function loads the full details for all favorited IDs
    const loadFavorites = useCallback(async () => {
        setIsLoading(true);
        const favoriteIds = getFavorites();

        // Separate IDs by type if possible, or assume a convention (e.g., dress-xxx, acc-xxx)
        const itemsToFetch = favoriteIds.map(id => {
            // NOTE: You must have a way to know the item's type (dress vs accessory) from its ID
            const type = id.includes('dress') ? 'dress' : 'accessory'; 
            return { id, type };
        });

        const detailsPromises = itemsToFetch.map(item => 
            fetchItemDetails(item.id, item.type)
        );

        const loadedItems = (await Promise.all(detailsPromises)).filter(item => item !== null);
        setFavoritedItems(loadedItems);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        loadFavorites();

        window.addEventListener('favoritesUpdated', loadFavorites);

        return () => {
            window.removeEventListener('favoritesUpdated', loadFavorites);
        };
    }, [loadFavorites]);

    // Handler to remove an item directly from this page
    const handleRemove = (itemId) => {
        toggleFavorite(itemId);
        // Update the local state instantly for a smoother UI
        setFavoritedItems(prevItems => prevItems.filter(item => item._id !== itemId));
    };

    if (isLoading) {
        return <div className="loading-message">Loading your dream list...</div>;
    }

    return (
        <div className="favorites-page-container">
            <main className="favorites-main-content">
                <h1 className="page-title">Your Favorites ✨</h1>
                <p className="page-subtitle">All the dresses and accessories you love, saved in one place.</p>
                
                {favoritedItems.length === 0 ? (
                    <div className="empty-message">
                        <Heart size={40} color="#ccc" style={{ marginBottom: '15px' }} />
                        <p>Your favorites list is currently empty. Start exploring our collections!</p>
                        {/* Add links to Dresses and Accessories pages here */}
                    </div>
                ) : (
                    <div className="favorites-grid">
                        {favoritedItems.map(item => (
                            <div key={item._id} className="favorite-card">
                                <img 
                                    src={item.image_placeholder_url} 
                                    alt={item.name} 
                                    className="favorite-image"
                                />
                                <div className="favorite-info">
                                    <h3 className="favorite-name">{item.name}</h3>
                                    <p className="favorite-type">{item.type.toUpperCase()}</p>
                                    <p className="favorite-price">{item.price_range}</p>
                                    <button 
                                        className="remove-button" 
                                        onClick={() => handleRemove(item._id)}
                                        aria-label="Remove from Favorites"
                                    >
                                        <Trash2 size={20} /> Remove
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