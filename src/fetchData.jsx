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

export {fetchData}
