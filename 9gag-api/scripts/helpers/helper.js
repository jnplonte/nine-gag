var config = require( "../../config.js" );
var connection = require( "./database" );

var helper = {
  "toJson":       toJson,
	"queryLimit": 	queryLimit,
  "queryOrder": 	queryOrder,
	"getQuery": 		getQuery,
	"postQuery": 		postQuery,
	"putQuery": 		putQuery,
	"deleteQuery": 	deleteQuery
};

function toJson(jsonData) {
  var  response = '';
  try {
      response = JSON.parse(jsonData);
  } catch (e) {
      response = jsonData;
  }
  return response;
}

function queryLimit(query, page) {
  var offset = (page - 1) * parseInt(config.productLimit), rowCount = parseInt(config.productLimit);
  query = query + ' LIMIT ' + offset + ', ' + rowCount;

  return query;
}

function queryOrder(query, key, sort) {
  key = key || 'id'; sort = sort || 'DESC';

  if(sort.toUpperCase() != 'ASC' && sort.toUpperCase() != 'DESC'){
    sort = 'DESC';
  }

  query = query + ' ORDER BY ' + key + ' ' + sort.toUpperCase();

  return query;
}

function getQuery(query, callback) {
	console.log('get query ...');
	console.log(query);
	connection.query(query, function (error, results, fields) {
    if(!error){
      callback(results);
    }else{
      callback({"error": error});
    }
  });
}

function postQuery(query, params, callback) {
	console.log('post query ...');
	console.log(query);
	connection.query(query, params, function (error, results, fields) {
    if(!error){
      callback([{"inserted_id": (results.insertId).toString()}]);
    }else{
      callback({"error": error});
    }
  });
}

function putQuery(query, params, callback) {
	console.log('put query ...');
	console.log(query);
	connection.query(query, params, function (error, results, fields) {
    if(!error){
      callback([{"affected_rows": (results.affectedRows).toString()}]);
    }else{
      callback({"error": error});
    }
  });
}

function deleteQuery(query, callback) {
	console.log('delete query ...');
	console.log(query);
	connection.query(query, function (error, results, fields) {
    if(!error){
      callback([{"affected_rows": (results.affectedRows).toString()}]);
    }else{
      callback({"error": error});
    }
  });
}

module.exports = helper;
