import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

async function fetchData(setPokemonData){
  try{
    const random = Math.floor(Math.random() * 900);
    console.log(random);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`)

    if(!response.ok){
      throw new Error("could not fetch from api")
    }

    const data = await response.json()
    console.log(data);
    setPokemonData(data);
  }


  catch(error){
    console.log(error);
  }
}

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
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        </>
      )}
      </div>
    </>
  )
}

export default App
