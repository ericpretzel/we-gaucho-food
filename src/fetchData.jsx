function getURL(date_time, dining_hall, meal){
  return `https://api.ucsb.edu/dining/menu/v1/${date_time}/${dining_hall}/${meal}`
}

async function fetchData(setDiningData, selectedOption){
  // Try block
  try{
    console.log(selectedOption);
    const date = new Date();
    console.log(date.toISOString());
    const URL = getURL(date.toISOString(), selectedOption, "dinner")
    const response = await fetch(URL, {
      headers: {
        "ucsb-api-key": import.meta.env.VITE_REACT_APP_API_KEY
      }
    });

    console.log(response);

    // Throw error if response is not ok
    if(!response.ok){
      throw new Error(response.statusText)
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
