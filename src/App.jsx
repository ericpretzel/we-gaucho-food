import { useState } from 'react'
import { useEffect } from 'react'
import {fetchData} from './fetchData'
import './App.css'

function App() {
  const [diningData, setDiningData] = useState(null);

  useEffect(() => {
    fetchData(setDiningData);
  }, []);

  const handleClick = () => {
    fetchData(setDiningData);
  }

  return (
    <>
      <div>
      {diningData && (
        <>
          <button type="button" onClick={handleClick}>
            Get new meal
          </button>
          <h1>Data:</h1>
          <ul>
            {diningData.map((foodItem) => (
              <li key={foodItem.id}>{foodItem.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
    </>
  )
}

export default App
