import React, { useState, useEffect } from 'react';
import { fetchData } from '../../fetchData';
import Modal from 'react-modal';
import FoodItemDetailsPage from './FoodItemDetailsPage';
import { diningHalls } from '../../firebase';

const FoodDisplay = (props) => {
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    fetchData(setFoodItems, props.name);
  }, []);

  const headerStyle = {
    backgroundImage: 'url("https://dining.ucsb.edu/sites/default/files/images/heroimages/carrillo-outdoor-patio.jpg',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#ffffff',
    padding: '5%',
    textAlign: 'center',
    fontFamily: 'Helvetica Neue, sans-serif',
  };

  if (props.name === diningHalls.CARRILLO) {
    headerStyle.backgroundImage = 'url("https://dining.ucsb.edu/sites/default/files/images/heroimages/carrillo-outdoor-patio.jpg'
  } else if (props.name === diningHalls.DLG) {
    headerStyle.backgroundImage = 'url("https://thebottomline.as.ucsb.edu/wp-content/uploads/2019/01/IMG_8344.jpg'
  } else if (props.name === diningHalls.PORTOLA) {
    headerStyle.backgroundImage = 'url("https://dining.ucsb.edu/sites/default/files/images/heroimages/hero-portola-1.jpg'
  }

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
    padding: '1%',
    margin: '1%',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica Neue, sans-serif',
    transition: 'box-shadow 0.3s',
    width: '20%',
    minWidth: '100px',
  };

  const mealTimes = ['Breakfast', 'Brunch', 'Lunch', 'Dinner'];

  const linkStyle = {
    color: '#3498db',
    textDecoration: 'none',
    transition: 'color 0.3s',
  };

  const onCardHover = (index) => {
    // You can modify this function if needed
    return index;
  };

  const openModal = (foodItem) => {
    setSelectedFoodItem(foodItem);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedFoodItem(null);
    setModalIsOpen(false);
  };

  const modalStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 1000,
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '4px',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      minWidth: '80%', // Adjust the width as needed
      minHeight: '80%', // Adjust the height as needed
    },
  };

  return (
    <div>
      {/* Header */}
      <div style={headerStyle}>
        <h1 className="text-xl font-bold" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '2px' }}>{props.displayName}</h1>
      </div>

      {/* Sub Headers and Food Cards */}
      {mealTimes.map((mealTime, index) => (
        <div key={mealTime}>
          <div style={subHeaderStyle}>
            <h2 className="text-lg font-semibold">{mealTime}</h2>
          </div>
          <div className="flex flex-wrap">
            {foodItems.filter((foodItem) => foodItem.meal === mealTime).map((foodItem, index) => (
              <div key={index} style={cardStyle}>
                <h2 className="text-lg font-semibold">
                  <button onClick={() => openModal(foodItem)} style={linkStyle}>
                    {foodItem.name}
                  </button>
                </h2>
                <p>Rating: {typeof(foodItem.rating) === 'number' ? foodItem.rating.toFixed(1) : foodItem.rating}/5 ({foodItem.reviews.length} Reviews)</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Food Item Details Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Food Item Details"
        style={modalStyle}
      >
        <div style={{ textAlign: 'right', cursor: 'pointer' }} onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="24"
            height="24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        {selectedFoodItem && (
          <FoodItemDetailsPage foodItem={selectedFoodItem} diningHall={props.name} />
        )}
      </Modal>
    </div>
  );
};

export default FoodDisplay;