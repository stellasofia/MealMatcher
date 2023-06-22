

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
        getDetailsLink.href = "#";
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