const Shoe = require("../models/shoe.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Shoe
    const shoe = new Shoe({
      shoe_id: req.body.shoe_id,
      shoe_brand: req.body.shoe_brand,
      shoe_size: req.body.shoe_size,
      shoe_colour: req.body.shoe_colour,
      id: req.body.id
    });
  
    // Save Shoe in the database
    Shoe.create(shoe, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Shoe."
        });
      else res.send(data);
    });
  };

  // Retrieve all Shoes from the database (with condition).
exports.findAll = (req, res) => {
    const shoe_id = req.query.shoe_id;
  
    Shoe.getAll(shoe_id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Shoes."
        });
      else res.send(data);
    });
  };
  
  exports.findAllPublished = (req, res) => {
    Shoe.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Shoes."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Shoe.findById(req.params.shoe_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Shoe with shoe_id ${req.params.shoe_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Shoe with shoe_id " + req.params.shoe_id
          });
        }
      } else res.send(data);
    });
  };


  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Shoe.updateById(
      req.params.shoe_id,
      new Shoe(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Shoe with shoe_id ${req.params.shoe_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Shoe with shoe_id " + req.params.shoe_id
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Shoe.remove(req.params.shoe_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Shoe with shoe_id ${req.params.shoe_id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Shoe with shoe_id " + req.params.shoe_id
          });
        }
      } else res.send({ message: `Shoe was deleted successfully!` });
    });
  };