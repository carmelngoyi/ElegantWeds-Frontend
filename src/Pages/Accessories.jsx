import React, { useState, useEffect } from 'react';

import { X, Calendar } from 'lucide-react';

import './Accessories.css';

import veil from '../assets/bride-veil.jpg';


const BOOKING_LINK = "/bookings";

const AccessoryDetailModal = ({ accessory, onClose }) => {

if (!accessory) return null;

return (
<div className="modal-overlay" onClick={onClose}>

<div className="modal-content" onClick={e => e.stopPropagation()}>

<button className="modal-close-button" onClick={onClose}>

<X size={24} />

</button>


<div className="modal-body">

{/* <div className="modal-image-container">

<img

src={MOCK_IMAGE_URL(dress._id)}

alt={dress.name}

className="modal-image"

onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x500/ccc/333?text=Image+Error" }}

/>

</div> */}


<div className="modal-details">

{/* <div>

<h4 className="productbrand">{product.brand}</h4>

<h3 className="productNames">{product.product_name}</h3>

<p className="prices">R{product.price}</p>

</div> */}

<img className='modal-image' src={accessory.image_placeholder_url || accessory.image} alt={accessory.accessory_name} />

<h2 className="modal-title">{accessory.name}</h2>

<p className="modal-price">Price Range: **{accessory.price_range}**</p>


{/* <div className="modal-info-block">

<h3>Key Specifications</h3>

<p><strong>Silhouette:</strong> {dress.silhouette}</p>

<p><strong>Neckline:</strong> {dress.neckline}</p>

<p><strong>Fabric:</strong> {dress.fabric}</p>

<p><strong>Train:</strong> {dress.trainLength}</p>

</div> */}


<div className="modal-description-block">

<h3>Description</h3>

<p>{accessory.description}</p>

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



const Accessories = () => {

const [accessories, setAccessories] = useState([]);

const [isLoading, setIsLoading] = useState(true);

const [error, setError] = useState(null);

const [selectedAccessories, setSelectedAccessory] = useState(null);



useEffect(() => {

const fetchAccessories = async () => {

try {

const response = await fetch('http://localhost:3000/accessories');


if (!response.ok) {

throw new Error(`HTTP error! status: ${response.status}`);

}


const data = await response.json();


const mappedData = data.map((d, index) => ({

...d,

_id: d._id || `mock-${index + 1}`

}));



setAccessories(mappedData);

setError(null);



} catch (err) {

console.error("Failed to fetch accessories:", err);

setError("Failed to load accessory catalog. Please ensure the backend is running and the /accessories endpoint is active.");

} finally {

setIsLoading(false);

}

};



fetchAccessories();

}, []);



const openModal = (accessory) => {

setSelectedAccessory(accessory);

document.body.style.overflow = 'hidden';

};



const closeModal = () => {

setSelectedAccessory(null);

document.body.style.overflow = 'unset';

};



return (

<div className="accessories-page-container">

<section className="about-hero-banner">

<div className="banner-image-container">

<img

src={veil}

alt="Bride ball gown dress"

className="banner-image"

/>

<div className="quote-overlay-text">

<p className="quote-text">It was always you... and a little sparkle</p>

</div>

</div>

</section>

<main className="accessories-main-content">

<h1 className="page-title">The Bridal Collection</h1>

<p className="page-subtitle">Explore our exclusive selection of luxury wedding Accessories.</p>



{isLoading && <div className="loading-message">Loading the elegant collection...</div>}


{error && <div className="error-message">{error}</div>}



{!isLoading && !error && accessories.length === 0 && (

<div className="empty-message">No accessories found. Please add items to the "accessories" collection in MongoDB.</div>

)}


<div className="accessories-grid">

{accessories.map((accessory) => (

<div

key={accessory._id}

className="accessory-card"

onClick={() => openModal(accessory)}

role="button"

tabIndex="0"

>

{/* <img

src={MOCK_IMAGE_URL(dress._id)}

alt={dress.name}

className="dress-image"

onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x500/ccc/333?text=Image+Error" }}

/> */}

<div className="accessory-info">

<h3 className="accessory-name">{accessory.name}</h3>

</div>

</div>

))}

</div>

</main>



<AccessoryDetailModal

accessory={selectedAccessories}

onClose={closeModal}

/>



</div>

);

};



export default Accessories;