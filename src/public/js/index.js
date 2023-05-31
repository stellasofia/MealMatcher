function searchRecipe(searchInput) {

  const getRecipes = async () => {
    const recipes = await fetch (`/recipes?query=${searchInput}`)
    console.log("hiiiiii");
  }
  
  // funktion  wird aufgerufen
  getRecipes();
 

}

