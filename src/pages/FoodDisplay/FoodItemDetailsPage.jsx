// FoodItemDetailsPage.jsx
import React from 'react';

const FoodItemDetailsPage = ({ foodItem }) => {
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
  };

  return (
    <>
      {/* Header */}
      <div style={headerStyle}>
        <h1 className="text-xl font-bold">{foodItem.name}</h1>
        <div style={ratingStyle}>Rating: {foodItem.rating.toFixed(1)}/10</div>
      </div>

      {/* Comments Section */}
      <div>
        <h2 style={sectionTitleStyle}>Comments:</h2>
        {/* Horizontal Line */}
        <hr />
        {/* Example Comment */}
        <div style={commentStyle}>Example Comment #1</div>
        {/* Horizontal Line */}
        <hr />
        {/* Add more comments as needed */}
      </div>
    </>
  );
};

export default FoodItemDetailsPage;
