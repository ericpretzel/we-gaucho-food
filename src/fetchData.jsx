import "./firebase.js"

async function fetchData(setDiningData, selectedOption){
  // Try block
  try{
    console.log(selectedOption);
    const currentDate = new Date();
    const date = new Date(currentDate.getFullYear(),
                          currentDate.getMonth(),
                          currentDate.getDate(),
                          currentDate.getHours() - 8,
                          currentDate.getMinutes(),
                          currentDate.getSeconds(),
                          currentDate.getMilliseconds());
    const avaliable_meals_res = await fetch(`https://api.ucsb.edu/dining/menu/v1/${date.toISOString()}/${selectedOption}`, {
        headers: {
          "ucsb-api-key": import.meta.env.VITE_REACT_APP_API_KEY
        }
      });

    // Throw error if response is not ok
    if(!avaliable_meals_res.ok){
      throw new Error(avaliable_meals_res.statusText)
    }
    const avaliable_meals = await avaliable_meals_res.json()

    var avaliable_meals_list = []
    for(var i = 0; i < avaliable_meals.length; i++){
      avaliable_meals_list.push(avaliable_meals[i].name)
    }
    console.log(avaliable_meals_list);

    var foods = []

    for(i = 0; i < avaliable_meals_list.length; i++){
      var meal = avaliable_meals_list[i]
      const res = await fetch(`https://api.ucsb.edu/dining/menu/v1/${date.toISOString()}/${selectedOption}/${meal}`, {
        headers: {
          "ucsb-api-key": import.meta.env.VITE_REACT_APP_API_KEY
        }
      });

      const data = await res.json();
      for(var j = 0; j < data.length; j++){
        foods.push(data[j]);
      }

    }
      setDiningData(foods);
      console.log(foods);

  }

  // Catch error
  catch(error){
    console.log(error);
  }
}

export {fetchData}
