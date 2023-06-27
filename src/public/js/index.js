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
        if (response.ok) {
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
  if (favoritesButton) {
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

function getRandomCocktail() {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('cocktailDetails', JSON.stringify(data));
      window.location.href = 'cocktail.html';
    });
}

document.addEventListener('click', event => {
  if (event.target.matches('.btn-search-cocktail')) {
    const cocktailId = event.target.closest('.box').id;
    getCocktailDetails(cocktailId);
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