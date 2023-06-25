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

        const recipeContainer = document.getElementById(recipe.id)
        recipeContainer.remove()
      })

  } else {
    // Session doesn't exist, redirect to login.html
    window.location.href = "login.html";
  }


}

document.addEventListener("DOMContentLoaded", () => {
  const favoritesButton = document.querySelector(".nav-link");
  favoritesButton.addEventListener("click", handleFavoritesClick);
});

function handleFavoritesClick(event) {
  event.preventDefault();

  const sessionId = getCookie("session");
  if (sessionId) {
    // Session exists, redirect to favorites.html
    window.location.href = "favorites.html";
  } else {
    // Session doesn't exist, redirect to login.html
    window.location.href = "login.html";
  }
}

// Helper function to get the value of a cookie by name
function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return cookie[1];
    }
  }
  return "";
}


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
  fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=ff9c2c48de514451bba22bb3017484c5`)
    .then(response => response.json())
    .then(data => {
      // Hier können Sie den Code hinzufügen, um die Daten auf Ihrer Webseite anzuzeigen
      // Zum Beispiel:
      const mainElement = document.getElementById("box-container2");
      mainElement.innerHTML = `
      <h2>${data.title}</h2>
      <img src="${data.image}" alt="${data.title}">
      <h3>Ingredients:</h3>
      <ul>
        ${data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
      </ul>
      <h3>Instructions:</h3>
      <p>${data.instructions}</p>
    `;
    });
}

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