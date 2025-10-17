import React from 'react';
import './AboutUs.css';
import Navbar from '../Components/Navbar'; 
import Footer from '../Components/Footer'; 
import veilImage from '../assets/veil1.jpg'; 
import founderImage from '../assets/founder.jpg'; 

const AboutUs = () => {
  return (
    <div className="about-us-container">

      <section className="about-hero-banner">
        <div className="banner-image-container">
          <img 
            src={veilImage} 
            alt="Bride behind a veil with a quote" 
            className="banner-image"
          />
          <div className="quote-overlay-text">
            <p className="quote-text">STYLE IS A WAY TO SAY WHO YOU ARE WITHOUT SAYING ANYTHING AT ALL</p>
          </div>
        </div>
      </section>

      <section className="about-intro-section">
        <h2 className="about-intro-heading">ABOUT OUR BRIDAL BOUTIQUE</h2>
        <div className="intro-content-grid">
          <div className="intro-column">
            <p>Marie Élégance holds the most luxurious, curated collections of designer wedding dresses in South Africa. Upon entering our bridal boutique, brides will notice we place immense emphasis on luxury and service. Our beautiful and elegant award-winning designer wedding dress collections merge traditional and modern European styles into exquisitely fashion-forward and luxurious gowns. Our unique collections have become renowned due to its focus on innovative style and fashion, exceptional quality and above all, a fit and finish like no other. At Marie Élégance we aspire to be prominent, unique and hold our reputation as the top bridal shop that offers our brides a personal one-on-one bridal experience in the elegance of our modern bridal boutique in Johannesburg, South Africa. We pride ourselves in providing our brides with only the most luxurious, romantic, elegant, fashion-forward designer wedding dresses to date, allowing our brides to walk away with confidence, feeling beautiful and saying 'YES' to the dress of their dreams.</p>
          </div>
          <div className="intro-column">
            <p>Marie Élégance has an exceptional reputation in wedding dresses in South Africa. It is not only rated as one of the top bridal shops in Johannesburg but also competes in a world-class league of bridal shops across the globe. Marie Élégance Bridal Couture is the proud, authorized exclusive Milanova, Luce Sposa, Lanestra, Ari Villosa agent for Africa. Our zen bridal boutique offers our bride’s this luxurious collection of designer wedding dresses. Located in the heart of Johannesburg we love to celebrate the glow, the radiance and the pure elation of brides in love. Together with classic bridal shades, stunning silhouettes, impeccable construction, luxurious lace, feminine designs and quality fabrics; Our service, quality and reputation has made us the top bridal shop in South Africa.</p>
          </div>
        </div>
      </section>

      <section className="creator-bio-section">
        <div className="bio-split-content">
          <div className="bio-image-column">
            <img 
              src={founderImage} 
              alt="Founder of Marie Élégance" 
              className="founder-photo"
            />
          </div>
          <div className="bio-text-column">
            <p className="founder-name">Jeanette Suzanne</p>
            <h3 className="founder-quote">CREATOR OF QUALITY DESIGNS AND THINKER OF FRESH IDEAS.</h3>
          </div>
        </div>
      </section>

      <section className="creator-bio-and-service-section">
        <div className="content-container">
          <h2 className="section-title">& A LITTLE MORE</h2>
          <div className="content-columns">
            <div className="column bio-column">
              <p>Jeanette Suzanne, the founder and creative soul behind <strong>Mariés Elégants</strong>. As a hands-on creative fashion designer in the South African industry, she captures the individuality that all brides hope to express. Jeanette created Mariés Elégants Bridal Couture out of a sincere passion for the bridal industry and an unwavering belief that the bridal gown shopping experience should be special, peaceful, and an unforgettable experience from start to finish.</p>
              <p>With our fashion designing skills and creativity, we create beautiful wedding dresses which reflect each bride's unique personality.</p>
              <p className="quote">"I travel the world in search of emerging designers, beautiful fabrics made with superior craftsmanship, and exclusive curated designs and styles. Together with our fashion skills and creativity, we create beautiful wedding dresses which reflect each bride's unique personality. My team and I at <strong>Mariés Elégants Bridal</strong> understand that selecting your wedding gown is a very exciting and nervous time for a bride to be. With this in mind, my focus is to ensure that our bridal experience is truly inspirational, unique and one you will remember forever, offering you only the <strong>best quality wedding dresses</strong> and showcasing you the art of luxury couture in a creative and intimate studio environment."</p>
            </div>
            <div className="column service-column">
              <p>Through our one-on-one styling and consulting services, I provide my brides and their families with the best possible wedding dress shopping experience; that means the bride and her family have the bridal boutique shop to themselves for the entire appointment time. Because your wedding dress purchase is a once-in-a-lifetime event, you deserve the sole attention of a professional. At Mariés Elégants our attention to detail and our professional designing services make Mariés Elégants Couture one of the top bridal studio's in South Africa.</p>
              <p>We invite you to book with us, meet myself and my team of designers and let us create you something magical for your special day."</p>
              <p className="booking-link">To schedule a bridal appointment at our lovely bridal boutique please <a href="/contact">contact us</a>.</p>
              <p className="booking-cta">We look forward to meeting all our beautiful new brides-to-be!</p>
            </div>
          </div>
        </div>
      </section>
    
    </div>
  );
};

export default AboutUs;