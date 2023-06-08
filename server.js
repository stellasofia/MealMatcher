const express = require('express');
const favorites = require("./recipe-favorites")
const app = express();
const path = require("path");
const http = require("http");

const axios = require('axios');
const key_api = 'ff9c2c48de514451bba22bb3017484c5'
const key_api2 = 'b9626a5b5716476da85bed6e7fba5387'


const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "src")));


app.get('/', (req, res) => {
  res.sendStatus(202);
});

/*
app.get('recipe/:id', async (req, res) => {
  const { id } = req.params;
  const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information&apiKey=${key_api}`);
  const recipe = response.data;
  res.send(recipe);
})
*/

// --- 
app.get('/recipes', async (req, res) => {
  const query = req.query.query;
  console.log(query);
  const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=16&apiKey=${key_api}`);
  const recipes = response.data.results;
  res.send(recipes);

});

app.get("/favorites", async (req, res) => {
  res.send(favorites)
})

/*

app.get("/recipeInfo", function (req, res) {
  const id = req.body.id;
  res.send(favorites[id]);
})

app.put("/recipeInfo", function (req, res) {
  const id = req.body.id
  favorites[id] = req.body;

  res.status(201);
  res.send(req.body.title);

});

*/

app.post("/addFavorite", async (req, res) => {
  favorites[req.body.id] = req.body
})

app.delete("/deleteFavorite", async (req, res) => {
  delete favorites[req.body.id]
  res.sendStatus(200)
})


app.listen(3001, () => {
  console.log('Server running on port 3001');
});
