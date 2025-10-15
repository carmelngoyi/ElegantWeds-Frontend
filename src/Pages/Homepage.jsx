import React from 'react';
import './Homepage.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules'; 
import image1 from '../assets/a-line1.jpg'; 
import image2 from '../assets/bride-veil.jpg'; 
import image3 from '../assets/Camelia1.jpg'; 
import image4 from '../assets/Kitty-Chen-Barcelona-Veil.png';
import Amelia from '../assets/Amelia44023_a.webp'; 
import Nino from '../assets/a-line2.png';  
import Leonie from '../assets/ball-gown1.jpeg';  
import Amour from '../assets/a-line3.jpg';  
import Navbar from '../Components/Navbar'; 
import Footer from '../Components/Footer'; 

const heroImages = [image1, image2, image3, image4];

const featuredDresses = [
  { name: "Amelia", image: Amelia },
  { name: "NINO", image: Nino },
  { name: "LEONIE", image: Leonie },
  { name: "AMOUR", image: Amour },
];

const Homepage = () => {
  return (
    <div className="homepage-container">
      <main className="homepage">
        <div className="hero-content-column">
          <h1 className="hero-title">Luxurious Bridal Couture by Marie Élégance</h1>
          <p className="hero-subtitle">
            Crafting the dress of your dreams for the most unforgettable day. Hire or purchase your perfect wedding gown with us.
          </p>
          <button className="cta-button">View Collection</button>
        </div>

        <div className="image-swiper-column">
          <Swiper
            modules={[Autoplay]} 
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            className="image-swiper"
          >
            {heroImages.map((img, index) => (
              <SwiperSlide key={index}>
                <img 
                  src={img} 
                  alt={`Bridal Gown ${index + 1}`} 
                  className="swiper-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </main>

      <section className="featured-dresses-section">
        <h2 className="featured-dresses-heading">OFFERING LUXURY WEDDING GOWNS</h2>
        
        <div className="dress-grid">
          {featuredDresses.map((dress) => (
            <div key={dress.name} className="dress-card">
              <div className="dress-image-container">
                <img 
                  src={dress.image} 
                  alt={`Bridal Gown ${dress.name}`} 
                  className="dress-image"
                />
              </div>
              <h3 className="dress-name">{dress.name}</h3>
            </div>
          ))}
        </div>
        
      </section>
    </div>
  );
};

export default Homepage;