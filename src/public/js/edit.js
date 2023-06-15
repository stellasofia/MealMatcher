async function getRecipeInfo(id) {
  const response = await fetch(`/getRecipeInfo?id=${id}`)
  const result = await response.text()
  const resultParsed = JSON.parse(result)

  const title = document.getElementById("title").value = resultParsed.title
  const image = document.getElementById("image").value = resultParsed.image
}

window.onload = function () {
  const id = new URLSearchParams(window.location.search).get("id");
  getRecipeInfo(id)
};


function putRecipe(recipeTitle) {
  const id = new URLSearchParams(window.location.search).get("id");
  const title = document.getElementById("title").value
  const image = document.getElementById("image").value
  let recipeInfo = { title, image }

  fetch(`/updateRecipeInfo?id=${id}`,
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipeInfo)
    }).then(response => {
      console.log(response.json())
    })

  window.location.href = "/favorites.html"
}