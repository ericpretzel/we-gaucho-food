import { diningHalls, getAllEntreesAndReviews, addEntrees } from './firebase'

async function fetchData(setDiningData, diningHall){
  // Try block
  try{
    console.log(diningHall);
    const currentDate = new Date();
    const date = new Date(currentDate.getFullYear(),
                          currentDate.getMonth(),
                          currentDate.getDate(),
                          currentDate.getHours() - 8,
                          currentDate.getMinutes(),
                          currentDate.getSeconds(),
                          currentDate.getMilliseconds());
    const avaliable_meals_res = await fetch(`https://api.ucsb.edu/dining/menu/v1/${date.toISOString()}/${diningHall}`, {
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
      const res = await fetch(`https://api.ucsb.edu/dining/menu/v1/${date.toISOString()}/${diningHall}/${meal}`, {
        headers: {
          "ucsb-api-key": import.meta.env.VITE_REACT_APP_API_KEY
        }
      });

      const data = await res.json();
      for(var j = 0; j < data.length; j++){
        data[j].meal = meal;
        foods.push(data[j]);
      }

    }

    const reviews = await getAllEntreesAndReviews(diningHall);
    
    for (var i = 0; i < foods.length; i++) {
      const entree = foods[i];
      const entreeReviews = reviews.find((it) => it.name === entree.name);
      if (entreeReviews && entreeReviews.reviews.length > 0) {
        var total = 0;
        for (var j = 0; j < entreeReviews.reviews.length; j++) {
          total += parseInt(''+entreeReviews.reviews[j].rating);
        }
        entree.rating = total / entreeReviews.reviews.length;
      } else {
        entree.rating = 'No reviews yet';
      }

      entree.reviews = entreeReviews ? entreeReviews.reviews : [];
    }
    await addEntrees(diningHall, foods);
    setDiningData(foods);
    console.log(foods);

  }

  // Catch error
  catch(error){
    console.log(error);
  }
}

export {fetchData}
