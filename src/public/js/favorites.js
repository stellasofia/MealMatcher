function deleteFavorite(recipe) {
    fetch("/deleteFavorite",
      {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
      }).then(() => {
        const article = document.getElementById(recipe.id)
        article.remove()
      })
  }
  
  
  function renderFavorties() {
    fetch(`/favorites`)
      .then(response => response.json())
      .then(favorites => {
        console.log(Object.values(favorites))
  
        const mainElement = document.getElementById("box-container");
  
        // If search something new remove old recipes
        while (mainElement.childElementCount > 0) {
          mainElement.firstChild.remove()
        }
        Object.values(favorites).forEach(recipe => {
          const divBox = document.createElement("div");
          const divImage = document.createElement("div");
          const img = document.createElement("img");
          const divIcons = document.createElement("div");
          const deleteIcon = document.createElement("a");
          const editDetails = document.createElement("a");
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
          deleteIcon.addEventListener("click", () => {
            deleteFavorite(recipe);
          })
          deleteIcon.className = "fa fa-trash";
          editDetails.href = "/edit.html";
          editDetails.className = "getDetails-btn";
          editDetails.textContent = "Edit details";
          
  
          mainElement.append(divBox);
          divBox.append(divImage, divContent);
          divImage.append(img, divIcons);
          divIcons.append(deleteIcon, editDetails);
          divContent.append(h3);
  
          console.log(recipe)
        });
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }
  renderFavorties()