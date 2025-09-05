// ----------------------------------------------
// TCSS 460: Summer 2024
// MySQL Configuration: Backend
// ----------------------------------------------
// Code is based on the 
// Node.js for MySQL Library:
// https://github.com/mysqljs/mysql
// ----------------------------------------------

// ----------------------------------------------
// (A) Import the MySQL module or library
// ----------------------------------------------
const mysql = require("mysql");

// ----------------------------------------------
// (B) Configure the connection options for MySQL
// ----------------------------------------------
const mysqlConfig = {
    host: "localhost", 
    port: 3306,
    user: "testuser", 
    password: "mypassword",
    database: "cardata",
    debug: false, // Connection debugging mode is OFF
    connectionLimit: 10, // Add this line
    queueLimit: 30 // Add this line
};

// ----------------------------------------------
// (C) Establishing connection using the options
//     defined in mysqlConfig (without a query)
// ----------------------------------------------
const dbConnection = mysql.createPool(mysqlConfig);

// ----------------------------------------------
// (D) This module exports dbConnection to be 
//     used other files (e.g., server.js)
// ----------------------------------------------
module.exports = dbConnection;
