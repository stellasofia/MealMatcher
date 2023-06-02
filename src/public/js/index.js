function searchRecipe() {
  let input = document.getElementById("test").value
  console.log(input)
  //Wird grad nicht gebrauch
  fetch(`/recipes?query=${input}`)
    .then(response => response.json())
    .then(recipes => {
      console.log(recipes);
      // Handle the response data (recipes)


      const mainElement = document.querySelector("main");
    
      // If search something new remove old recipes
      while (mainElement.childElementCount > 0) {
        mainElement.firstChild.remove()
     }

      recipes.forEach(recipe => {
        const article = document.createElement("article");
        const divHeader = document.createElement("div");
        const divContent = document.createElement("div");
        const img = document.createElement("img");
        const titleP = document.createElement("p");
        const pButton = document.createElement("p");
        const getDetailsButton = document.createElement("button");

        img.src = recipe.image
        titleP.textContent = recipe.title
        getDetailsButton.type = 'button'
        getDetailsButton.textContent = 'get Details'
        
        mainElement.append(article)
        article.append(divHeader, divContent)
        divHeader.append(titleP)
        divContent.append(img, pButton)
        pButton.append(getDetailsButton)

        // set class do use flexbox in css
        article.className = 'recipe--container';
        img.className = 'recipe--image'
        //pButton.className = 
        divHeader.className = 'recipe--header'
        divContent.className = 'recipe--content'
        titleP.className = 'recipe--name'


        console.log(recipe)
      });
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });



}
