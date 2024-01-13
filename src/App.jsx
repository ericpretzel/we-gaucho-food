import { useState } from 'react'
import { useEffect } from 'react'
import {fetchData} from './fetchData'
import './App.css'

function App() {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    fetchData(setPokemonData);
  }, []);

  return (
    <>
      <div>
        {pokemonData && (
        <>
          <h1>Pokemon Name: {pokemonData.name}</h1>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} width={200} height={200}/>
        </>
      )}
      </div>
    </>
  )
}

export default App
