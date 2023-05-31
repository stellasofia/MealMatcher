
//TODO: delete old search result and only display the newly searched recipes !!!!!!!!!!!!!!!!!!!!!!!!! (maybe just use React...)

function searchRecipe() {

  let input = document.getElementById("test").value
  console.log(input)
  //Wird grad nicht gebrauch
  fetch(`/recipes?query=${input}`)
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



}
