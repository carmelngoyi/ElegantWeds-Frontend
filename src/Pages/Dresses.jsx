import React, { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import './Dresses.css';
import dressImage from '../assets/Vienna-sophia-tolli-wedding.jpg';

const BOOKING_LINK = "/bookings";
const DressDetailModal = ({ dress, onClose }) => {
if (!dress) return null;

return (
    <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
        <X size={24} />
        </button>

    <div className="modal-body">
    <div className="modal-details">

        <img className='modal-image' src={dress.image_placeholder_url} alt={dress.dress_name} />
        <h2 className="modal-title">{dress.name}</h2>
        <p className="modal-price">Price Range: {dress.price_range}</p>
    <div className="modal-description-block">
        <h3>Description</h3>
        <p className='description'>{dress.description}</p>
    </div>

        <a href={BOOKING_LINK} className="modal-booking-button">
            <Calendar size={20} style={{ marginRight: '8px' }} />
            Book a Private Consultation
        </a>
    </div>
    </div>
    </div>
    </div>
    );
    };

    const Dresses = () => {
        const [dresses, setDresses] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);
        const [selectedDress, setSelectedDress] = useState(null);

    useEffect(() => {
        const fetchDresses = async () => {
        try {
        const API_BASE = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_BASE}/dresses`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const mappedData = data.map((d, index) => ({
            ...d,
            _id: d._id || `mock-${index + 1}`

        }));

        setDresses(mappedData);
        setError(null);

        } catch (err) {

            console.error("Failed to fetch dresses:", err);
            setError("Failed to load dress catalog. Please ensure the backend is running and the /dresses endpoint is active.");
        } finally {
            setIsLoading(false);
        }
        };

        fetchDresses();
    }, []);

    const openModal = (dress) => {
    setSelectedDress(dress);
    document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
    setSelectedDress(null);
    document.body.style.overflow = 'unset';
    };

    return (
        <div className="dresses-page-container">
        <section className="about-hero-banner">
        <div className="banner-image-container">
        <img
        src={dressImage}
        alt="Bride ball gown dress"
        className="banner-image"
        />

        <div className="quote-overlay-text">
        <p className="quote-text">
            Becoming a bride is about the emotions woven into the journey.
            </p>
        </div>
        </div>
        </section>

        <main className="dresses-main-content">
            <h1 className="page-title">The Bridal Collection</h1>
            <p className="page-subtitle">Explore our exclusive selection of luxury wedding gowns.</p>

        {isLoading && <div className="loading-message">Loading the elegant collection...</div>}
        {error && <div className="error-message">{error}</div>}

        {!isLoading && !error && dresses.length === 0 && (
        <div className="empty-message">
            No dresses found. Please add items to the "dresses" collection in MongoDB.
            </div>

        )}

        <div className="dresses-grid">
        {dresses.map((dress) => (
        <div
        key={dress._id}
        className="dress-card"
        onClick={() => openModal(dress)}
        role="button"
        tabIndex="0"
        >

        <div className="dress-info">
            <h3 className="dress-name">{dress.name}</h3>
        </div>
        </div>

        ))}
        </div>
        </main>

        <DressDetailModal
        dress={selectedDress}
        onClose={closeModal}
        />
        </div>
);
};

export default Dresses;