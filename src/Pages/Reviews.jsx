import React, { useState, useEffect } from 'react';
import { Send, User, Star } from 'lucide-react';
import './Reviews.css';
import Navbar from '../Components/Navbar'; 
import Footer from '../Components/Footer'; 

const MOCK_USER = {
  _id: '654321fedcba9876543210', 
  name: 'Cady Carnes',
  email: 'cadycarnes@gmail.com',
  base64AuthToken: 'amFuZUBleGFtcGxlLmNvbTpwYXNzd29yZDEyMw==' 
};

const API_BASE = "https://elegantweds-backend.onrender.com"; 

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star 
        key={i} 
        size={18} 
        className={`star-icon ${i < fullStars ? 'star-filled' : 'star-empty'}`}
        style={{ fill: i < fullStars ? 'gold' : 'transparent', stroke: 'gold' }} 
      />
    );
  }
  return <div className="rating-stars-container flex space-x-0.5">{stars}</div>;
};

const App = () => {
  const [reviews, setReviews] = useState([]);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false); 
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [submissionStatus, setSubmissionStatus] = useState(null); 
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    fetchReviews();
    setIsUserSignedIn(MOCK_USER.base64AuthToken !== ''); 
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      setFetchError(null);
      const response = await fetch(`${API_BASE}/reviews`); 

      if (!response.ok) {
        console.error('Failed to fetch reviews status:', response.status);
        throw new Error(`Failed to fetch reviews: Status ${response.status}`);
      }
      
      const data = await response.json();
      setReviews(data.reverse()); 
    } catch (error) {
      console.error('Error fetching reviews:', error);
      if (error.message.includes('Failed to fetch')) {
        setFetchError('Connection Error: Cannot reach the backend API. Check API_BASE URL and CORS settings.');
      } else {
        setFetchError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText || !isUserSignedIn) return;

    setSubmissionStatus('submitting');

    const newReview = {
      rating: rating,
      reviewText: reviewText,
      userId: MOCK_USER._id,
      userName: MOCK_USER.name, 
    };

    try {
      const response = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${MOCK_USER.base64AuthToken}`, 
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        let errorData = {};
        try {
            errorData = await response.json();
        } catch (e) {
        }
        
        console.error("Submission failed. Status:", response.status, "Error data:", errorData);
        throw new Error(errorData.error || `Failed to post review. Status: ${response.status}`);
      }

      const result = await response.json();
      
      setReviews([result.review, ...reviews]); 
      setReviewText('');
      setRating(5);
      setSubmissionStatus('success');

    } catch (error) {
      let displayMsg = error.message;
       if (error.message.includes('Failed to fetch')) {
            displayMsg = 'Connection Error: Cannot reach API. Check URL/CORS.';
        }
      console.error('Error submitting review:', error);
      setSubmissionStatus('error');
      } finally {
      setTimeout(() => setSubmissionStatus(null), 3000); 
    }
  };
  


  const renderReviewForm = () => (
    <div className="review-form-box">
      <h2 className="form-title">Share Your Experience</h2>
      <form onSubmit={handleReviewSubmit}>
        
        <div className="rating-picker">
          <label className="rating-label">Your Rating:</label>
          <div className="star-selector-container">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <Star 
                key={starValue}
                size={24}
                onClick={() => setRating(starValue)}
                className={`star-selector-icon ${starValue <= rating ? 'selected' : ''}`}
                style={{ fill: starValue <= rating ? 'gold' : 'transparent', stroke: '#A3836B' }}
              />
            ))}
          </div>
        </div>
        
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder={`Leave your review here, ${MOCK_USER.name}...`}
          rows="4"
          className="review-textarea"
          required
        ></textarea>
        
        <div className="submission-controls">
          {submissionStatus === 'submitting' && (
            <span className="submission-status submitting">
              <span className="spinner"></span>
              Submitting...
            </span>
          )}
          {submissionStatus === 'success' && (
            <span className="submission-status success">Review Posted Successfully!</span>
          )}
          {submissionStatus === 'error' && (
            <span className="submission-status error">Error posting review. Try again.</span>
          )}

          <button
            type="submit"
            disabled={submissionStatus === 'submitting'}
            className="submit-button"
          >
            <Send size={18} className="icon-mr" />
            Post Review
          </button>
        </div>
      </form>
    </div>
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderReviewCard = (review) => (
    <div key={review._id} className="review-card">
      <div className="reviewer-info-header">
        <div className="reviewer-details">
          <User size={20} className="user-icon" />
          <p className="reviewer-name">
            {review.userName || 'Anonymous User'}
          </p>
        </div>
        <RatingStars rating={review.rating} />
      </div>

      <p className="review-text">
        "{review.reviewText}"
      </p>

      <p className="review-date">
        Posted on {formatDate(review.createdAt)}
      </p>
    </div>
  );

  return (
    <React.Fragment>
      <style>{internalStyles}</style>
      <div className="reviews-container">
        <div className="reviews-header-title">
          <h1 className="page-title">Reviews from our Mariés Elégants</h1>
        </div>
        
        <main className="reviews-main">
          
          {isUserSignedIn ? (
            renderReviewForm()
          ) : (
            <div className="signed-out-message review-form-box">
              <p className="signed-out-title text-xl font-bold">Please sign in to leave a review.</p>
              <p className="signed-out-text text-gray-600">We value feedback from our authenticated customers.</p>
            </div>
          )}
          
          <div className="reviews-list-header">
              <h3 className="list-title">
                  Customer Testimonials ({reviews.length})
              </h3>
          </div>

          {fetchError && (
             <div className="error-message-fetch">
                <p>⚠️ **{fetchError}**</p>
                <p>Please ensure your backend is deployed and the **API_BASE** constant in this file is set correctly.</p>
             </div>
          )}

          {isLoading && !fetchError && (
            <div className="loading-message">Loading reviews...</div>
          )}
          
          {!isLoading && reviews.length === 0 && !fetchError && (
            <div className="empty-message">Be the first to leave a review!</div>
          )}

          <div className="reviews-list">
            {reviews.map(renderReviewCard)}
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default App;
