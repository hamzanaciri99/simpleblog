var bodyParser = require('body-parser').urlencoded({extended: false});
var postDao = require('../modele/postsDao');
var userDao = require('../modele/usersDao');
var commentDao = require('../modele/commentsDao');

module.exports = function(app) {
    
    
    app.get('/', function(req, res){
        postDao.getPosts(12, function(posts) {
            res.render('index', {
                posts,
            });
        });
    });
    
    app.get('/post', function(req, res){
        res.redirect('../');
    });
    
    app.get('/post/:id', function(req, res){
        postDao.getPostAndUser(req.params.id, function(postData) {
            commentDao.getCommentsAndUsers(req.params.id, function(commentData) {
                res.render('post', {
                    postData : postData[0],
                    commentData : commentData,
                });
            });
        });
    });
    
    //Add Comment
    app.post('/post/:id', bodyParser, function(req, res) {
        commentDao.addComment({
            user_id : req.body.user_id,
            post_id : req.params.id,
            comment_content : req.body.comment_content,
        });
        res.redirect('back');
    });
};