document.addEventListener('DOMContentLoaded', () => {

  const urlParams = new URLSearchParams(window.location.search);
  const cocktailId = urlParams.get('id');

  if (cocktailId) {
    fetch(`/cocktail-details/${cocktailId}`)
      .then(response => response.json())
      .then(data => {
        const cocktailDetails = data.cocktailDetails;

        const mainElement = document.getElementById("box-container-cocktail");

        const titleElement = document.createElement("h2");
        titleElement.className = "titleElement";
        titleElement.textContent = cocktailDetails.strDrink;
        mainElement.appendChild(titleElement);

        const imageElement = document.createElement("img");
        imageElement.className = "imageElement";
        imageElement.src = cocktailDetails.strDrinkThumb;
        mainElement.appendChild(imageElement);

        const ingredientsElement = document.createElement("div");
        ingredientsElement.className = "ingredientsElement";
        mainElement.appendChild(ingredientsElement);

        const ingredientsTitle = document.createElement("h3");
        ingredientsTitle.className = "ingredientsTitle";
        ingredientsTitle.textContent = "Ingredients:";
        ingredientsElement.appendChild(ingredientsTitle);

        const ulElement = document.createElement("ul");
        ingredientsElement.appendChild(ulElement);

        for (let i = 1; i <= 15; i++) {
          const ingredient = cocktailDetails[`strIngredient${i}`];
          const measure = cocktailDetails[`strMeasure${i}`];

          if (ingredient && ingredient.trim() !== '') {
            const liElement = document.createElement("li");
            liElement.textContent = `${measure} ${ingredient}`;
            ulElement.appendChild(liElement);
          }
        }

        const instructionsElement = document.createElement("div");
        instructionsElement.className = "instructionsElement";
        mainElement.appendChild(instructionsElement);

        const instructionsTitle = document.createElement("h3");
        instructionsTitle.className = "instructionsTitle";
        instructionsTitle.textContent = "Instructions:";
        instructionsElement.appendChild(instructionsTitle);

        const instructionsParagraph = document.createElement("p");
        instructionsParagraph.textContent = cocktailDetails.strInstructions;
        instructionsElement.appendChild(instructionsParagraph);
      })
      .catch(error => {
        console.error(error);
        // Handle error
      });
  }
});