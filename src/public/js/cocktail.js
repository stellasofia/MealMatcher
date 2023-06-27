// --- COCKTAIL SECTION --- //

document.addEventListener('DOMContentLoaded', () => {
    const cocktailDetails = JSON.parse(localStorage.getItem('cocktailDetails'));

    if (cocktailDetails) {
        const mainElement = document.getElementById("box-container-cocktail");

        const titleElement = document.createElement("h2");
        titleElement.className = "titleElement";
        titleElement.textContent = cocktailDetails.drinks[0].strDrink;
        mainElement.appendChild(titleElement);

        const imageElement = document.createElement("img");
        imageElement.className = "imageElement";
        imageElement.src = cocktailDetails.drinks[0].strDrinkThumb;
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
            const ingredient = cocktailDetails.drinks[0][`strIngredient${i}`];
            const measure = cocktailDetails.drinks[0][`strMeasure${i}`];

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
        instructionsParagraph.textContent = cocktailDetails.drinks[0].strInstructions;
        instructionsElement.appendChild(instructionsParagraph);
    }
});


/*
function getRandomCocktail() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then(
        function (response) {
          if (response.data != 200) {
            console.log('Looks like there was a problem.')
            return;
          }
  
          // Examine the text in the respone
          response.json().then(function (data) {
            console.log(data);
            displayRandomCocktail(data);
  
          });
        }
      )
  }
  
  getRandomCocktail();
  
  function displayRandomCocktail(cocktail) {
    console.log(cocktail.drinks[0]);
  
    let drinkSection = document.querySelector('#drink-section');
  
    let drinkName = document.createElement('h2');
    drinkName.innerHTML = cocktail.drinks[0].strDrink;
  
    drinkSection.appendChild(drinnkName);
  
    let img = document.createElement('img');
    img.src = cocktail.drinks[0].strDrinkThumb;
  
    drinkSection.appendChild(img);
  
    for (let i = 1; i < 16; i++) {
      console.log();
  
      if (cocktail.drinks[0][`strIngredients${i}`] == null) {
        break;
      }
  
      let ingredient = document.createElement('');
      ingredient.innerHTML = cocktail.drinks[0][`strMeasure${i}`] + ': ' + cocktail.drinks[0][`strIngredient${i}`]
  
      drinkSection.appendChild(ingredient);
    }
  
    let card = document.createElement('p');
    card.innerHTML = cocktail.drinks[0].strInstructions;
  
    drinkSection.appendChild('card');
  }
  */