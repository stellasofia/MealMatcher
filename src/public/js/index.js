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

      recipes.forEach(recipe => {
        const article = document.createElement("article");
        const img = document.createElement("img");
        const titleH1 = document.createElement("h1");
        const pButton = document.createElement("p");
        const getDetailsButton = document.createElement("button");

        img.src = recipe.image
        titleH1.textContent = recipe.title
        getDetailsButton.type = 'button'
        getDetailsButton.textContent = 'get Details'
        

        bodyElement.append(article);
        
        article.append(titleH1,img,pButton)
        pButton.append(getDetailsButton)


        
        console.log(recipe)
      });
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });



}
