var express = require('express');
var http = require("http");
var app = express();
var ejs = require('ejs');
var port = process.env.PORT || 3000;
 

app.set('view engine', 'ejs');
app.use('/assets', express.static('public'));


app.get('/', function(req, res){
	res.render('index');
});

app.get('/post', function(req, res){
	res.redirect('../');
});

app.get('/post/:id', function(req, res){
	res.render('post', {
		id: req.params.id
	});
});

var postController = require('./controllers/postController');
postController(app);

app.listen(port);
