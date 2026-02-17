import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Calendar, Heart } from 'lucide-react';
import './Dresses.css';
import { toggleFavorite, isFavorite } from "../Favourite.js";
import dressImage from '../assets/Vienna-sophia-tolli-wedding.jpg';

const DressDetailModal = ({ dress, onClose }) => {
  const navigate = useNavigate();
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (dress?._id) {
      setFavorited(isFavorite(dress._id));
    }
  }, [dress]);

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(dress._id);
    setFavorited(prev => !prev);
  };

  if (!dress) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          <X size={24} />
        </button>

        <button
          className={`favorite-button ${favorited ? 'favorited' : ''}`}
          onClick={handleFavorite}
          aria-label="Add to Favorites"
        >
          <Heart size={22} fill={favorited ? 'red' : 'none'} color={favorited ? 'red' : '#555'} />
        </button>

        <div className="modal-body">
          <div className="modal-details">
            <img className='modal-image' src={dress.image_placeholder_url || dress.image || dressImage} alt={dress.name} />
            <h2 className="modal-title">{dress.name}</h2>
            <p className="modal-price">Price Range: {dress.price_range}</p>

            <div className="modal-description-block">
              <h3>Description</h3>
              <p className='description'>{dress.description}</p>
            </div>

            <button
              className="modal-booking-button"
              onClick={() => navigate("/bookings")}
            >
              <Calendar size={20} style={{ marginRight: '8px' }} />
              Book a Private Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
