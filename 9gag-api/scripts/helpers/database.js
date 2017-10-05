var mysql = require('mysql');
var config = require( "../../config.js" );

var connection = mysql.createConnection({
  host     : config.dataBase.dbServer,
  user     : config.dataBase.dbUser,
  password : config.dataBase.dbPassword,
  database : config.dataBase.dbName
});

connection.connect(function(err){
  if(!err) {
    console.log("Database is connected ...");
  } else {
    console.log("Error connecting database ...");
  }
});

module.exports = connection;
