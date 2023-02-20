const mysql = require('mysql2')
require("dotenv").config();

let sql = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true
 });

console.log("Connected Successfully");
module.exports = sql;


