var express = require('express');
var bodyParser = require('body-parser')
var serveStatic = require('serve-static');
var jf = require('jsonfile');
/*
var mysql      = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'shopping_list'
});

connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});

connection.query('SELECT 1', function(err, rows) {
});
*/
var db;
jf.readFile("shopping_list.json", function(err, obj) {
	db = obj;
})


var app = express();

app.use( bodyParser.json() );  
app.get('/', function(req, res){
	res.json(db);
});
app.post('/', function(req, res){
	var item = req.body;
	
	db.items.push(item);
	jf.writeFile("shopping_list.json", db, function(err, obj) {

});

	console.log(db);
	res.json(item);
});
app.use(serveStatic(__dirname));


app.listen(8080);
