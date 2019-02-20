var bodyParser = require('body-parser').urlencoded({extended: false});
var postDao = require('../modele/postsDao');
var userDao = require('../modele/usersDao');
var commentDao = require('../modele/commentsDao');


module.exports = function(app) {
    
    app.post('/user/addPost', bodyParser, function(req, res){
        userDao.getUser({user_id:req.body.user_id}, (userData) => {
            if(userData.length != 0) {
                postDao.addPost({
                    post_title : req.body.title,
                    post_content : req.body.content,
                    user_id : req.body.user_id,
                });
            }
        });
        res.redirect('back');
    });
    
    app.delete('/user/deletePost/:id', function(req, res){
        postDao.removePost(req.params.id);
        res.redirect('back');
    });
    
    
    
};