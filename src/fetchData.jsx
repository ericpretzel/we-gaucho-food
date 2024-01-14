import "./firebase.js"

function getURL(date_time, dining_hall, meal){
  return `https://api.ucsb.edu/dining/menu/v1/${date_time}/${dining_hall}/${meal}`
}

async function fetchData(setDiningData, selectedOption){
  // Try block
  try{
    console.log(selectedOption);
    // const currentDate = new Date();
    // const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours() - 8, currentDate.getMinutes(), currentDate.getSeconds(), currentDate.getMilliseconds());
    // console.log(date.toISOString());
    const URL = getURL("2024-01-14T00:00:00", selectedOption, "dinner")
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
    setDiningData(data);
    // console.log(data);
  }

  // Catch error
  catch(error){
    console.log(error);
  }
}

export {fetchData}
