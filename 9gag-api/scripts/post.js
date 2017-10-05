var config = require( "../config.js" );
var connection = require( "./helpers/database" );
var helper = require( "./helpers/helper" );

var postFunctions = function() {
	this.allPost = allPost;
	  this.getPost = getPost;
	  this.putPost = putPost;
};

var query = 'SELECT * FROM post';

function allPost(req, res) {
	var page = req.query.page || 1;
	var sort = req.query.sort || 'DESC';
	var key  = req.query.key || 'id';
	var finalQuery = query;

	helper.getQuery(helper.queryLimit(helper.queryOrder(finalQuery, key, sort), page), function(results){
		results.forEach(function(val) {
			val = cleanField(val);
		}, this);
		res.json(results);
	});
}

function getPost(req, res) {
  	var id = req.params.id || null;

	getPostValue(id, function(results){
		results.forEach(function(val) {
			val = cleanField(val);
		}, this);
		
		res.json(results);
	});
}

function putPost(req, res) {
	var id = req.params.id || null;
	getPostValue(id, function(validationResults){
		if(validationResults.length >= 1){
			if (typeof(req.body) != 'undefined' && req.body.featured) {
				var finalQuery = 'UPDATE post SET ? WHERE Iid = ' + connection.escape(id), params = {};
				if (req.body.featured) {
					params.featured = 1;
				}

				helper.putQuery(finalQuery, params, function(results){
					res.json(results);
				});
			} else {
				res.json({"error": {"code":"invalid instagram id"}});
			}
		}else{
			res.json({"error": {"code":"invalid instagram id"}});
		}
	});
}

function getPostValue(id, callback) {
  if(id){
		var finalQuery = query + ' WHERE Iid = ' + connection.escape(id);

		helper.getQuery(finalQuery, function(results){
			callback(results);
		});
	}else{
		callback({"error": {"code":"instagram id is required"}});
	}
}

function cleanField(val) {
	if(typeof(val.image) != 'undefined'){
		val.image = helper.toJson(val.image);
	}

	if(typeof(val.image) != 'undefined'){
		val.video = helper.toJson(val.video);
	}

	if(typeof(val.image) != 'undefined'){
		val.carousel = helper.toJson(val.carousel);
	}

	return val;
}

module.exports = postFunctions;
