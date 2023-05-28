const express = require('express');
const app = express();
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "src")));

app.get('/', (req, res) => {
  res.sendStatus(202);
});

app.get('/data', (req, res) => {
    const data = {
      message: 'Hello, Express!',
      timestamp: new Date()
    };
    //API
    
    res.send(data);
  });

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

