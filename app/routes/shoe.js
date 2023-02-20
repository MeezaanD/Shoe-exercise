module.exports = app => {
    const shoes = require('../controllers/shoe.controller.js');
    const {message} = require('../middleware/message')
    var router = require('express').Router();

  // Create a new Shoe
  router.post("/",message, shoes.create);

  // Retrieve all Shoes
  router.get("/",message, shoes.findAll);

  // Retrieve a single Shoe with id
  router.get("/:id",message, shoes.findOne);

  // Update a Shoe with id
  router.put("/:id",message, shoes.update);

  // Delete a Shoe with id
  router.delete("/:id",message, shoes.delete);

  app.use('/api/shoes',message, router);
};