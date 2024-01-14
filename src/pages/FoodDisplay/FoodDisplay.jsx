import React from 'react';

const FoodDisplay = () => {
  const headerStyle = {
    backgroundColor: '#1a202c',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    color: '#ffffff',
    padding: '16px',
    position: 'sticky',
    top: 0,
    textAlign: 'center',
    zIndex: 1000,
    fontFamily: 'Helvetica Rounded Bold, sans-serif',
  };

  const subHeaderStyle = {
    backgroundColor: '#4299e1',
    padding: '12px',
    fontFamily: 'Helvetica Rounded Bold, sans-serif',
  };

  const cardStyle = {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    margin: '16px',
    borderRadius: '8px',
    backgroundColor: '#f0f4f8',
    fontFamily: 'Helvetica Rounded Bold, sans-serif',
  };

  const mealTimes = ['Breakfast', 'Lunch', 'Dinner'];

  const foodItems = [
    { name: 'Food Item 1', rating: 8.3 },
    { name: 'Food Item 2', rating: 9.5 },
    { name: 'Food Item 3', rating: 7.2 },
    // Add more food items as needed
  ];

  const linkStyle = {
    color: '#000000', // Black color for hyperlinks
    textDecoration: 'none',
    transition: 'text-decoration 0.3s', // Smooth transition for underline
  };

  return (
    <>
      {/* Header */}
      <div style={headerStyle}>
        <h1 className="text-xl font-bold">Dining Hall Name</h1>
      </div>

      {/* Sub Headers and Food Cards */}
      {mealTimes.map((mealTime) => (
        <div key={mealTime}>
          <div style={subHeaderStyle}>{mealTime}</div>
          <div className="flex flex-wrap">
            {foodItems.map((foodItem, index) => (
              <div key={index} style={cardStyle}>
                <h2 className="text-lg font-semibold">
                  <a href="#" style={linkStyle}>
                    {foodItem.name}
                  </a>
                </h2>
                <p>Rating: {foodItem.rating.toFixed(1)}/10</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default FoodDisplay;
