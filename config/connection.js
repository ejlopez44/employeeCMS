// Sensitive value protection
require('dotenv').config()

// Connection file to Database

const mysql = require('mysql')


// Mysql Connection
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'personnel_db'
});

// Create connection to database
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;