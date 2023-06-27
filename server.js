const express = require('express');
const favorites = require("./recipe-favorites")
const app = express();
const path = require("path");
const http = require("http");
const bcrypt = require('bcrypt'); // password encryptionn
const cookieParser = require('cookie-parser')
const cors = require('cors');

const axios = require('axios');
const key_api = 'ff9c2c48de514451bba22bb3017484c5'
const key_api2 = 'b9626a5b5716476da85bed6e7fba5387'
const key_api3 = 'de7eb05287aa4681a5a7224d5d7527c8'


const bodyParser = require("body-parser");
const req = require('express/lib/request');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "src")));
app.use(cookieParser());
app.use(cors());



app.get('/', (req, res) => {
  res.sendStatus(202);
});


// --- RECIPE LIST --- ///
app.get('/recipes', async (req, res) => {
  const query = req.query.query;
  console.log(query);
  const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=16&apiKey=${key_api2}`);
  const recipes = response.data.results;
  res.send(recipes);
});

// --- RECIPE SEARCH --- //
app.get('/recipes/:recipeId', async (req, res) => {
  const { recipeId } = req.params;
  const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${key_api2}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.log('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    });
})

// --- RANDOM FOOD JOKE --- //
app.get('/random-joke', async (req, res) => {
  axios.get(`https:www.api.spoonacular.com/food/jokes/random?apiKey=${key_api2}`)
    .then(response => {
      const foodJoke = response.data.text;
      res.send(foodJoke);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error retrieving food joke');
    });
});


app.get("/favorites", async (req, res) => {
  res.send(favorites)
})


app.post("/addFavorite", async (req, res) => {
  favorites[req.body.id] = req.body;
  res.sendStatus(200);
})

app.delete("/deleteFavorite", async (req, res) => {
  delete favorites[req.body.id]
  res.sendStatus(200)
})

app.get("/getRecipeInfo", async (req, res) => {
  id = req.query.id
  const response = favorites[id]
  res.send(response)
})

app.put("/updateRecipeInfo", async (req, res) => {
  id = req.query.id
  favorites[id].title = req.body.title
  favorites[id].image = req.body.image

  res.sendStatus(200)
})


// --- COCKTAILS --- //
app.get('/random-cocktail', async (req, res) => {
  axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(response => {
      const data = response.data;
      res.send(data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Fehler beim Abrufen des Cocktails');
    });
});

app.get('/cocktail-details/:id', async (req, res) => {
  const cocktailId = req.params.id;
  axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
    .then(response => {
      const data = response.data;
      res.send({ cocktailDetails: data.drinks[0] });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Fehler beim Abrufen der Cocktaildetails');
    });
});


// --- TIPS --- //
app.get('/tips', (req, res) => {
  axios.get(`https://api.spoonacular.com/food/trivia/random?apiKey=${key_api2}`)
    .then(response => {
      const cookingTip = response.data.text;
      res.send(cookingTip);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error retrieving cooking tip');
    });
});


// --- SESSION MANAGEMENT ---
const sessions = [];
const users = [];
let nextUserId = 1;
let sessionCount = 1;

app.get("/users", async (req, res) => {
  res.json(users);
})

app.get("/sessions", async (req, res) => {
  res.json(sessions);
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body; //eingegebenes username und password

  try {
    const user = users.find((user) => user.username === username); //vergleicht usernames im user array

    if (!user) {
      return res.status(401).json({ usernameError: "Username does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ passwordError: "Invalid password" });
    }

    const existingSession = sessions.find((session) => session.userId === user.userId);

    if (existingSession) {
      res.cookie("session", existingSession.sessionId);
    } else {
      const sessionId = sessionCount + 1000;
      sessionCount++;

      const session = {
        sessionId,
        userId: user.userId,
      };
      sessions.push(session);

      res.cookie("session", sessionId);
    }

    res.send("Login successful");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
})

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const userId = nextUserId++;

  try {
    const hashedPassword = await bcrypt.hash(password, 5)
    const newUser = {
      userId,
      username,
      hashedPassword,
    }
    users.push(newUser)
    res.send(newUser)
  } catch {
    res.status(500)
  }
})

app.post("/logout", (req, res) => {
  const sessionId = req.cookies.session;

  if (!sessionId) {
    return res.status(401).send("Unauthorized");
  }

  //sessions array nach der session suchen mit der erhaltenen sessionId
  const sessionIndex = sessions.findIndex((session) => session.sessionId === sessionId);

  //wenn gefunden, löschen(von array)
  if (sessionIndex !== -1) {
    sessions.splice(sessionIndex, 1);
  }

  //cookie clearen
  res.cookie("session", "", { expires: new Date(0) });

  res.send("Logged out successfully");
});



app.listen(3001, () => {
  console.log('Server running on port 3001');
});