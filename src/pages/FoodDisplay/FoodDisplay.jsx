import React from 'react';

const FoodDisplay = () => {
  const headerStyle = {
    backgroundImage: 'url("https://thebottomline.as.ucsb.edu/wp-content/uploads/2019/01/IMG_8344.jpg', // Replace "your-image-url.jpg" with the actual URL of your image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#ffffff',
    padding: '5%',
    textAlign: 'center',
    fontFamily: 'Helvetica Neue, sans-serif',
  };

  const subHeaderStyle = {
    backgroundColor: '#0b193b',
    padding: '3%',
    borderBottom: '2px solid #2c3e50',
    fontFamily: 'Helvetica Neue, sans-serif',
    color: '#ffffff',
  };

  const cardStyle = {
    border: '2px solid #0b193b',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '5%',
    margin: '5%',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica Neue, sans-serif',
    transition: 'box-shadow 0.3s',
    width: '40%',
    minWidth: '200px',
  };

  const mealTimes = ['Breakfast', 'Lunch', 'Dinner'];

  const foodItems = [
    { name: 'Food Item 1', rating: 8.3 },
    { name: 'Food Item 2', rating: 9.5 },
    { name: 'Food Item 3', rating: 7.2 },
    // Add more food items as needed
  ];

  const linkStyle = {
    color: '#3498db',
    textDecoration: 'none',
    transition: 'color 0.3s',
  };

  const onCardHover = (index) => {
    // You can modify this function if needed
    return index;
  };

  return (
    <div>
      {/* Header */}
      <div style={headerStyle}>
        <h1 className="text-3xl font-bold" style={{ textShadow: '2px 2px 2px #2c3e50' }}>Dining Hall Name</h1>
      </div>

      {/* Sub Headers and Food Cards */}
      {mealTimes.map((mealTime, index) => (
        <div key={mealTime}>
          <div style={subHeaderStyle}>
            <h2 className="text-lg font-semibold">{mealTime}</h2>
          </div>
          <div className="flex flex-wrap">
            {foodItems.map((foodItem, index) => (
              <div
                key={index}
                style={{ ...cardStyle, boxShadow: onCardHover(index) }}
              >
                <h3 className="text-xl font-semibold">
                  <a href="#" style={linkStyle}>
                    {foodItem.name}
                  </a>
                </h3>
                <p className="text-gray-600">Rating: {foodItem.rating.toFixed(1)}/10</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodDisplay;