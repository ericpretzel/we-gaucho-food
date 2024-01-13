function getURL(date_time, dining_hall, meal){
  return `https://api.ucsb.edu/dining/menu/v1/${date_time}/${dining_hall}/${meal}`
}

async function fetchData(setDiningData){
  // Try block
  try{
    const URL = getURL("2024-01-13T00:00:00", "portola", "dinner")
    const response = await fetch(URL, {
      headers: {
        "ucsb-api-key": import.meta.env.VITE_REACT_APP_API_KEY
      }
    });

    // Throw error if response is not ok
    if(!response.ok){
      throw new Error("could not fetch from api")
    }

    const data = await response.json()
    console.log(data);
    setDiningData(data);
  }



  // Catch error
  catch(error){
    console.log(error);
  }
}

export {fetchData}
