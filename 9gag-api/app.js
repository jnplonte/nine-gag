var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

var postFunctions = require('./scripts/post');

var routes = require('./scripts/routes');
var config = require( "./config.js" );

var functions = {
  post: new postFunctions()
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


routes.setup(app, functions);

var server = app.listen(config.port, function () {
  var port = server.address().port;
  console.log('api listening to http://localhost:%s', port);
});
