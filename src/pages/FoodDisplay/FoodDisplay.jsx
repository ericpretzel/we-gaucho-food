import React, { useState } from 'react';
import Modal from 'react-modal';
import FoodItemDetailsPage from './FoodItemDetailsPage';

const FoodDisplay = (props) => {
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
      padding: '16px',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      minWidth: '80%', // Adjust the width as needed
      minHeight: '80%', // Adjust the height as needed
    },
  };

  return (
    <>
      {/* Header */}
      <div style={headerStyle}>
        <h1 className="text-xl font-bold">{props.displayName}</h1>
      </div>

      {/* Sub Headers and Food Cards */}
      {mealTimes.map((mealTime) => (
        <div key={mealTime}>
          <div style={subHeaderStyle}>{mealTime}</div>
          <div className="flex flex-wrap">
            {foodItems.map((foodItem, index) => (
              <div key={index} style={cardStyle}>
                <h2 className="text-lg font-semibold">
                  <button onClick={() => openModal(foodItem)} style={linkStyle}>
                    {foodItem.name}
                  </button>
                </h2>
                <p>Rating: {foodItem.rating.toFixed(1)}/10</p>
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
          <FoodItemDetailsPage foodItem={selectedFoodItem} />
        )}
      </Modal>
    </>
  );
};

export default FoodDisplay;