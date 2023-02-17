module.exports = app => {
    const shoes = require('../controllers/shoe.controller.js');

    var router = require('express').Router();

  // Create a new Shoe
  router.post("/", shoes.create);

  // Retrieve all Shoes
  router.get("/", shoes.findAll);

  // Retrieve a single Shoe with id
  router.get("/:id", shoes.findOne);

  // Update a Shoe with id
  router.put("/:id", shoes.update);

  // Delete a Shoe with id
  router.delete("/:id", shoes.delete);

  app.use('/api/shoes', router);
};