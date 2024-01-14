// FoodItemDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { addReview } from '../../firebase';

const FoodItemDetailsPage = ({ foodItem, diningHall }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState(foodItem.reviews);

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    
    addReview(diningHall, foodItem.name, comment, rating)
      .then(() => {
        setComments(comments.concat(
          {
            text: comment, rating: rating
          }
        ))
      })

    setComment(''); // Clear the comment field
  };

  const headerStyle = {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    color: '#1a202c',
    padding: '16px',
    position: 'sticky',
    top: 0,
    textAlign: 'center',
    zIndex: 1000,
    fontFamily: 'Helvetica Rounded Bold, sans-serif',
  };

  const ratingStyle = {
    fontSize: '16px',
  };

  const sectionTitleStyle = {
    fontWeight: 'bold',
  };

  const commentStyle = {
    fontSize: '14px',
    color: '#666666',
    wordWrap: 'break-word',
    wordBreak: 'break-all'
  };

  return (
    <>
      {/* Header */}
      <div style={headerStyle}>
        <h1 className="text-xl font-bold">{foodItem.name}</h1>
        <div style={ratingStyle}>Rating: {typeof(foodItem.rating) === 'number' ? foodItem.rating.toFixed(1) : foodItem.rating}/5</div>
      </div>

      {/* Comments Section */}
      <div style={{ maxHeight: '300px', overflow: 'auto' }}>
        <h2 style={sectionTitleStyle}>Comments:</h2>
        {/* Horizontal Line */}
        <hr />
        {/* Comments */}
        {comments.map((review, index) => (
          <div key={index} style={commentStyle}>
            <hr/>
            <div style={commentStyle}>{review.text}</div>
            <div>Rating: {typeof(review.rating) === 'number' ? review.rating.toFixed(1) : review.rating}/5</div>
            <hr/>
          </div>
        ))}

        {/* Horizontal Line */}
        <hr />
        {/* Add more comments as needed */}
      </div>

      {/* Add Comment Section */}
      <div>
        <h2 style={sectionTitleStyle}>Add a Comment:</h2>
        {/* Horizontal Line */}
        <hr />
        {/* Add comment form */}
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write a comment..."
          />
          Rating:
          {/* Rating Dropdown */}
          <select onChange={handleRatingChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>



          <button type="submit">Submit</button>
        </form>
      </div>


    </>
  );
};

export default FoodItemDetailsPage;
