import React, { useState } from 'react';
import './Bookings.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const SAProvinces = [
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Free State",
  "Northern Cape",
];

const Bookings = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    weddingDate: '',
    residence: '',
    otherFittings: '',
    budget: '',
    appointmentPreference: '',
    notes: '',
  });
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['name', 'email', 'contactNumber', 'weddingDate', 'residence', 'otherFittings', 'budget', 'notes'];
    const isValid = requiredFields.every(field => formData[field] && formData[field].trim() !== '');

    if (isValid) {
        console.log('Booking Form Submitted:', formData);
        alert("Thank you for booking your enquiry! We will be in touch soon.");
        setShowError(false);
    } else {
        setShowError(true);
    }
  };

  return (
    <div className="bookings-container">

      <main className="bookings-main">
        <section className="booking-intro">
          <p>At Marie Élégance we strive to create a luxurious and exclusive environment which aims at providing our brides with a once in a lifetime experience. Our highly trained, professional stylists cater to you, your personal style and bridal look you want to create by showcasing our latest bridal collections that range from R35000 - R150000. You will be offered a variety of refreshments upon arrival in order to add that extra bit of luxury.</p>
        </section>

        <section className="booking-form-section">
          <form className="booking-form-box" onSubmit={handleSubmit}>
            <h2 className="form-title">ENQUIRY BOOKING FORM</h2>
            <p className="form-subtitle">Marie Élégance Bridal Couture stands out by presenting our brides the latest fashion forward dresses. This ensures each bride feels unique and is given the best personalized consultation.</p>
            <p className="required-note">Fields marked with an * are required</p>

            <label className="form-label" htmlFor="name">NAME & SURNAME *</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-input" required />

            <label className="form-label" htmlFor="email">EMAIL *</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-input" required />

            <label className="form-label" htmlFor="contactNumber">CONTACT NUMBER *</label>
            <input type="tel" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="form-input" required />

            <label className="form-label" htmlFor="weddingDate">Your Wedding Date *</label>
            <input type="date" id="weddingDate" name="weddingDate" value={formData.weddingDate} onChange={handleChange} className="form-input" required />

            <label className="form-label" htmlFor="residence">WHERE DO YOU RESIDE *</label>
            <select id="residence" name="residence" value={formData.residence} onChange={handleChange} className="form-input form-select" required>
              <option value="" disabled>Select a Province</option>
              {SAProvinces.map(province => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>

            <label className="form-label" htmlFor="otherFittings">HAVE YOU BEEN ON OTHER BRIDAL FITTINGS YET? *</label>
            <select id="otherFittings" name="otherFittings" value={formData.otherFittings} onChange={handleChange} className="form-input form-select" required>
              <option value="" disabled>Select an option</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
              <option value="PLANNING TO">PLANNING TO</option>
            </select>

            <label className="form-label" htmlFor="budget">PREFERRED WEDDING DRESS BUDGET *</label>
            <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className="form-input form-select" required>
              <option value="" disabled>Select a Budget Range</option>
              <option value="R35k-R48k">R35 000 - R48 000</option>
              <option value="R48k-R65k">R48 000 - R65 000</option>
              <option value="R65k+">R65 000 +</option>
            </select>

            <label className="form-label" htmlFor="appointmentPreference">I WOULD PREFER AN APPOINTMENT DURING THE</label>
            <select id="appointmentPreference" name="appointmentPreference" value={formData.appointmentPreference} onChange={handleChange} className="form-input form-select">
              <option value="" disabled>Select a preference</option>
              <option value="WEEK">WEEK</option>
              <option value="WEEKEND">WEEKEND</option>
            </select>

            <p className="notes-info">IF YOU HAVE A SPECIFIC BUDGET SET OUT THAT YOU WOULD LIKE TO STAY WITHIN, PLEASE LET YOUR CONSULTANT KNOW IN THE NOTES BELOW *</p>
            <textarea id="notes" name="notes" rows="5" value={formData.notes} onChange={handleChange} className="form-input form-textarea" required />

            <button type="submit" className="submit-button">Submit</button>

            {showError && (
              <p className="error-message">This is a required field. Please correct errors before submitting this form.</p>
            )}
            
          </form>
        </section>

        <section className="contact-details-section">
          <h2 className="details-title">CONTACT DETAILS & DIRECTIONS TO MARIE ÉLÉGANCE BRIDAL COUTURE</h2>
          <div className="details-grid">
            <div className="detail-column">
              <h3>BY APPOINTMENT ONLY</h3>
              <p>email - elegantweds0@gmail.com</p>
              <p>telephone - +27 (0)11 555 1234</p>
              <p>whatsapp - +27 (0)72 555 5678</p>
            </div>
            <div className="detail-column">
              <h3>BUSINESS HOURS</h3>
              <p>Monday - Friday: 9:00 - 16:00</p>
              <p>Saturday: 8:00 - 15:00</p>
              <p>Sunday: Closed | Public Holidays Closed</p>
            </div>
            <div className="detail-column">
              <h3>HOW TO FIND US</h3>
              <p>15 Elegance Drive, Bridal Haven</p>
              <p>Johannesburg, </p>
              <p>South Africa, 2196</p>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default Bookings;