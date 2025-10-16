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

const API_BASE = import.meta.env.VITE_API_URL;

const response = await fetch(`${API_BASE}`);
 

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star 
        key={i} 
        size={18} 
        className={i < fullStars ? 'star-filled' : 'star-empty'}
      />
    );
  }
  return <div className="rating-stars-container">{stars}</div>;
};

const App = () => {
  const [reviews, setReviews] = useState([]);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false); 
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', 'submitting'

  useEffect(() => {
    fetchReviews();
    setIsUserSignedIn(MOCK_USER.base64AuthToken !== ''); 
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/reviews`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data.reverse()); 
    } catch (error) {
      console.error('Error fetching reviews:', error);
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
    };

    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${MOCK_USER.base64AuthToken}`, 
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Submission failed:", errorText);
        throw new Error('Unauthorized or failed to post review.');
      }

      const result = await response.json();
      
      setReviews([result.review, ...reviews]); 
      setReviewText('');
      setRating(5);
      setSubmissionStatus('success');

    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmissionStatus('error');
    } finally {
      setTimeout(() => setSubmissionStatus(null), 3000); // Clear status message
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
    <div className="reviews-container">
      <div className="reviews-header-title">
        <h1 className="page-title">Reviews from our Mariés Elégants
</h1>
      </div>
      
      <main className="reviews-main">
        
        {isUserSignedIn ? (
          renderReviewForm()
        ) : (
          <div className="signed-out-message">
            <p className="signed-out-title">Please sign in to leave a review.</p>
            <p className="signed-out-text">We value feedback from our authenticated customers.</p>
          </div>
        )}
        
        <div className="reviews-list-header">
            <h3 className="list-title">
                Customer Testimonials ({reviews.length})
            </h3>
        </div>

        {isLoading && (
          <div className="loading-message">Loading reviews...</div>
        )}
        
        {!isLoading && reviews.length === 0 && (
          <div className="empty-message">Be the first to leave a review!</div>
        )}

        <div className="reviews-list">
          {reviews.map(renderReviewCard)}
        </div>
      </main>
    </div>
  );
};

export default App;
