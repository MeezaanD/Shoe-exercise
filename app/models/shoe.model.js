const sql = require("../config/db.config");
const {hash, compare, hashSync} = require('bcrypt');


// constructor
const Shoe = function(shoe) {
  this.shoe_id = shoe.shoe_id;
  this.shoe_brand = shoe.shoe_brand;
  this.shoe_size = shoe.shoe_size;
  this.shoe_colour = shoe.shoe_colour;
  this.id = shoe.id
};

Shoe.create = (newShoe, result) => {
  sql.query("INSERT INTO shoes SET ?", newShoe, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created shoe: ", { shoe_id: res.insertId, ...newShoe });
    result(null, { shoe_id: res.insertId, ...newShoe });
  });
};

Shoe.findById = (shoe_id, result) => {
  sql.query(`SELECT * FROM shoes WHERE shoe_id = ${shoe_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found shoe: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Shoe with the shoe_id
    result({ kind: "not_found" }, null);
  });
};

Shoe.getAll = (shoe_id, result) => {
  let query = "SELECT * FROM shoes";

  if (shoe_id) {
    query += ` WHERE shoe_id LIKE '%${shoe_id}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("shoes: ", res);
    result(null, res);
  });
};

Shoe.getAllPublished = result => {
  sql.query("SELECT * FROM shoes WHERE shoe_id=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("shoes: ", res);
    result(null, res);
  });
};

Shoe.updateById = (shoe_id, shoe, result) => {
  sql.query(
    "UPDATE shoes SET shoe_id = ?, shoe_brand = ?, shoe_size = ? WHERE shoe_id = ?",
    [shoe.shoe_id, shoe.shoe_brand, shoe.shoe_price,shoe.shoe_colour, shoe.id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Shoe with the shoe_id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated shoe: ", { shoe_id: shoe_id, ...shoe });
      result(null, { shoe_id: shoe_id, ...shoe });
    }
  );
};

Shoe.remove = (shoe_id, result) => {
  sql.query("DELETE FROM shoes WHERE shoe_id = ?", shoe_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Shoe with the shoe_id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted shoe with shoe_id: ", shoe_id);
    result(null, res);
  });
};

Shoe.removeAll = result => {
  sql.query("DELETE FROM shoes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} shoes`);
    result(null, res);
  });
};

module.exports = Shoe;