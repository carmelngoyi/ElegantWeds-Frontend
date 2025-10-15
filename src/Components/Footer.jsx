import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="footer-section">
          <h1 className="footer-h1">Marié Élégance</h1>
          <p className="footer-p">Luxurious Bridal Couture</p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="footer-social-link">Facebook</a>
            <a href="https://www.instagram.com/elegant_weds/" target="_blank" rel="noopener noreferrer" className="footer-social-link">Instagram</a>
          </div>
        </div>

        <div className="footer-section">
          <h2 className="footer-h2">Contact Us</h2>
          <p className="footer-p">Address: 123 Bridal St, Wedding City</p>
          <p className="footer-p">Phone: +27 69 456 7890</p>
          <p className="footer-p">Email: elegantweds@gmail.com</p>
        </div>

        <div className="footer-section">
          <h2 className="footer-h2">Business Hours</h2>
          <p className="footer-p">Monday - Friday: 10:00 - 17:00</p>
          <p className="footer-p">Saturday: 10:00 - 16:00</p>
          <p className="footer-p">Sunday: Closed</p>
          <p className='footer-p'>Public holidays: Closed
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Marie Élégance. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;