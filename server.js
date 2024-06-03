const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // This data will be saved inside req.body.
const passport = require('./auth');
const PORT = process.env.PORT || 3000;

// Middleware Function
const logRequest = (req, res, next) => {
  console.log( `[${new Date().toLocaleDateString()}] Request Made to : ${req.originalUrl}`);
  next(); // Move on to the next phase
}

app.use(logRequest);
const logcalAuthMiddleWare = passport.authenticate('local', {session: false});

app.get("/", function (req, res) {
  res.send("Welcome to our Hotel!!!");
});

app.use(passport.initialize());

// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);


app.listen(PORT, () => {
  console.log("listening on port 3000");
});
