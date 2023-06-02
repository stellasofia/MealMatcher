//Wird grad nicht gebraucht


fetch('/recipes')
  .then(response => response.json())
  .then(recipes => {
    console.log(recipes);
    // Handle the response data

    const bodyElement = document.body;

    recipes.forEach(element => {
      const foodTitle = document.createElement("h1");
      foodTitle.textContent = element.title
      bodyElement.append(foodTitle)
  
      console.log(element)
    });

  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });
