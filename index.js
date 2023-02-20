const express = require("express");
const cors = require("cors");
const {message} = require('./app/middleware/message')
const {errorHandling} = require('./app/middleware/ErrorHandling')
const app = express();

var corsOptions = {
  origin: "http://localhost:4000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// error handling
app.use(errorHandling)

// simple route
app.get("/", message,  (req, res) => {
  res.send((`<h3>Shoe website</h3>`));
});

require("./app/routes/user")(app);
require("./app/routes/shoe")(app);

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:4000`);
});