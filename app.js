var express = require('express');
var app = express();
var ejs = require('ejs');
var port = process.env.PORT || 3000;
 

app.set('view engine', 'ejs');
app.use('/assets', express.static('public'));

app.get('/post', function(req, res){
	res.redirect('../');
});


var postController = require('./controllers/postsController');
postController(app);

var userController = require('./controllers/usersController');
userController(app);

app.listen(port);
