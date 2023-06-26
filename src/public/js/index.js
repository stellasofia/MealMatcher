function addFavorite(recipe) {
  const sessionId = getCookie("session");

  if (sessionId) {
    fetch("/addFavorite",
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
      }).then(response => {
          if(response.ok) {
              const recipeContainer = document.getElementById(recipe.id)
              recipeContainer.remove()
          } else {
              console.error("failed", response.status);
          }
      }).catch(error => {
        console.error('Failed to add favorite:', error);
    });

  } else {
    // Session doesn't exist, redirect to login.html
    window.location.href = "login.html";
  }


}

document.addEventListener("DOMContentLoaded", () => {
  const sessionId = getCookie("session");
  if (sessionId) {
    toggleLoginLogoutButton(true);
  } else {
    toggleLoginLogoutButton(false);
  }

  const favoritesButton = document.querySelector(".fa-heart");
  if(favoritesButton){
    favoritesButton.addEventListener("click", handleFavoritesClick);
  }
});


function searchRecipe() {

  let input = document.getElementById("search").value
  console.log(input)
  //Wird grad nicht gebrauch
  fetch(`/recipes?query=${input}`)
    .then(response => response.json())
    .then(recipes => {
      console.log(recipes);
      // Handle the response data (recipes)


      const mainElement = document.getElementById("box-container");

      // If search something new remove old recipes
      while (mainElement.childElementCount > 0) {
        mainElement.firstChild.remove()
      }
      recipes.forEach(recipe => {
        const divBox = document.createElement("div");
        const divImage = document.createElement("div");
        const img = document.createElement("img");
        const divIcons = document.createElement("div");
        const heartIcon = document.createElement("a");
        const getDetailsLink = document.createElement("a");
        const divContent = document.createElement("div");
        const h3 = document.createElement("h3");

        img.src = recipe.image;
        h3.textContent = recipe.title;
        divBox.setAttribute("id", recipe.id);
        divBox.className = "box";
        divImage.className = "image";
        divIcons.className = "icons"
        divContent.className = "content"
        img.alt = "";
        heartIcon.addEventListener("click", () => {
          addFavorite(recipe);
        })
        heartIcon.className = "fas fa-heart";
        //getDetailsLink.href = "recipe.html?id" + recipe.id;
        getDetailsLink.className = "getDetails-btn";
        getDetailsLink.textContent = "get details";

        mainElement.append(divBox);
        divBox.append(divImage, divContent);
        divImage.append(img, divIcons);
        divIcons.append(heartIcon, getDetailsLink);
        divContent.append(h3);

        console.log(recipe)

      });
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });

}

// --- RECIPE SEARCH --- //

function getRecipeDetails(recipeId) {
  fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=de7eb05287aa4681a5a7224d5d7527c8`)
    .then(response => response.json())
    .then(data => {

      const mainElement = document.getElementById("box-container2");
      // Löscht vorhandene Inhalte des mainElement
      mainElement.innerHTML = '';

      const titleElement = document.createElement("h2");
      titleElement.className = "titleElement";
      titleElement.textContent = data.title;
      mainElement.appendChild(titleElement);

      const imageElement = document.createElement("img");
      imageElement.className = "imageElement";
      imageElement.src = data.image;
      mainElement.appendChild(imageElement);

      const ingredientsElement = document.createElement("div");
      ingredientsElement.className = "ingredientsElement";
      mainElement.appendChild(ingredientsElement);

      const ingredientsTitle = document.createElement("h3");
      ingredientsTitle.className = "ingredientsTitle"
      ingredientsTitle.textContent = "Ingredients:";
      ingredientsElement.appendChild(ingredientsTitle);

      const ulElement = document.createElement("ul");
      ingredientsElement.appendChild(ulElement);

      data.extendedIngredients.forEach(ingredient => {
        const liElement = document.createElement("li");
        liElement.textContent = ingredient.original;
        ulElement.appendChild(liElement);
      });

      const instructionsElement = document.createElement("div");
      instructionsElement.className = "instructionsElement";
      mainElement.appendChild(instructionsElement);

      data.analyzedInstructions[0].steps.forEach(step => {
        const stepElement = document.createElement("p");
        stepElement.textContent = step.step;
        instructionsElement.appendChild(stepElement);
      });
    });
};

document.addEventListener('click', event => {
  if (event.target.matches('.getDetails-btn')) {
    const recipeId = event.target.closest('.box').id;
    getRecipeDetails(recipeId);
  }
});


// --- TIPS SECTION --- //

document.addEventListener("DOMContentLoaded", function () {
  getTips();
});

function getTips() {
  fetch('/tips') // Replace with your API endpoint
    .then(response => response.text())
    .then(data => {
      document.getElementById('tipsParagraph').textContent = data;
    })
    .catch(error => {
      console.error('Failed to fetch data:', error);
      document.getElementById('tipsParagraph').textContent = 'Failed to fetch data.';
    });
}


// --- COCKTAIL SECTION --- //