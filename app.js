var express = require('express');
var ejs = require('ejs');
var session = require('express-session');

var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use('/assets', express.static('public'));
app.use(session({
	secret : 'sad potato',
	saveUninitialized : false,
	resave: false
}));

app.get('/user/edit', function(req, res){
	res.redirect('/');
});

app.get('/post', function(req, res){
	res.redirect('../');
});

app.get('/login', function(req, res) {
	if(req.session && req.session.user_id) {
		res.redirect('/');
		return;
	}
	res.sendFile(__dirname + '/public/login.html');
})

app.get('/signup', function(req, res) {
	if(req.session && req.session.user_id) {
		res.redirect('/');
		return;
	}
	res.sendFile(__dirname + '/public/signup.html');
})

app.get('/about', function(req, res) {
	res.sendFile(__dirname + '/public/about.html');
})

var userController = require('./controllers/usersController');
userController(app);

var postController = require('./controllers/postsController');
postController(app);

app.listen(port);
