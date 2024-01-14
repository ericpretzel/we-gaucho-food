import { useState } from 'react'
// import { useEffect } from 'react'
import {fetchData} from './fetchData'
import './App.css'

function App() {
  const [diningData, setDiningData] = useState(null);
  // Dropdown menu
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    const newSelectedOption = event.target.value;
    setSelectedOption(newSelectedOption);

    // Call fetchData immediately upon selecting an option
    if (newSelectedOption) {
      fetchData(setDiningData, newSelectedOption);
    }
  };




  // Webpage
  return (
    <>
      <div>
        <label htmlFor="dropdown">Select a dining hall:</label>
      <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
        <option value="">Select...</option>
        <option value="carrillo">Carrillo</option>
        <option value="de-la-guerra">De La Guerra</option>
        <option value="portola">Portola</option>
      </select>
      {diningData && (
        <>
          <ul>
            {diningData.map((item) => (
              <li key={item.name}>{item.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
    </>
  )
}

export default App
