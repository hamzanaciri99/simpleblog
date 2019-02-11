var mongoose = require('mongoose');
var bodyParser = require('body-parser').urlencoded({extended: false});
mongoose.connect('mongodb://testapp1:testapp1@ds213665.mlab.com:13665/myapptest', {useNewUrlParser: true});

var Schema = mongoose.Schema;
 
var postSchema = new Schema({
	author: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	comments: [{
		author: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		date: {
			type: Date,
			default: Date.now
		}
	}],
	date: {
		type: Date,
		default: Date.now
	}
});

var Post = mongoose.model('Post', postSchema);

module.exports = function(app) {

	//GET ALL POSTS
	app.get('/api/posts', function(req, res) {
		Post.find()
			.sort(typeof req.query.sorted !== "undefined" ? {date:-1} : {})
			.limit(12)
			.exec(function(err, posts) {
				res.send(posts);
			});
	});

	//GET POSTS COUNT
	app.get('/api/posts/count', function(req, res) {
		Post.find().exec(function(err, posts) {
			res.send({
				count: posts.length
			});
		});
	});

	//ADD NEW POST
	app.post('/api/posts', bodyParser, function(req, res){
		var newPost = new Post();
		newPost.author = req.body.author;
		newPost.title = req.body.title;
		newPost.content = req.body.content;
		newPost.save(function (err) {
    		if(err) {
    			res.send(err);
    		} else {
    			res.redirect('/');
    		}
   		});
	});

	//GET ONE POST
	app.get('/api/post/:id', function(req, res){
		Post.findById(req.params.id, function(err, post){
			res.send(post);
		});
	});

	//ADD NEW COMMENT
	app.post('/api/post/:id', bodyParser, function(req, res) {
		Post.findById(req.params.id, function(err, post) {
			 if (!err) {
			    post.comments.push({
			    	author: req.body.author,
			    	email: req.body.email,
			    	content: req.body.content
			    });
			    post.save(function (err) {
				    if(err) {
		    			res.send(err);
				    } else {
		    			res.redirect('/post/' + req.params.id);
		    		}
				});
			} else {
				res.send(err);
			}
		});
	});
};