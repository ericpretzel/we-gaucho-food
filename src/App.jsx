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
          <button type={"button"} onClick={handleClick}>Get new meal</button>
          <h1>Data: {diningData.name}</h1>
        </>
      )}
      </div>
    </>
  )
}

export default App
