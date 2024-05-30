const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // This data will be saved inside req.body.

app.get("/", function (req, res) {
  res.send("Welcome to our Hotel!!!");
});

// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("listening on port 3000");
});
