var bodyParser = require('body-parser').urlencoded({extended: false});
var postDao = require('../modele/postsDao');
var userDao = require('../modele/usersDao');
var commentDao = require('../modele/commentsDao');

module.exports = function(app) {

    app.get('/', function(req, res){
        postDao.getPosts(12, function(posts) {
            res.render('index', {
                posts,
                logged: req.session && req.session.user_id,
                user : {
                    title: req.session.title,
                    first_name: req.session.first_name,
                    last_name: req.session.last_name,
                    avatar: req.session.avatar
                },
                postData : null,
                commentData : null,
            });
        });
    });

    app.get('/edit/:id', bodyParser, function(req, res){
        if(!req.session || !req.session.user_id) {
            res.redirect('/login');
            return;
        }

        postDao.getPostAndUser(req.params.id, function(row) {
            if(row[0] != undefined && req.session.user_id == row[0].user_id) {
                postDao.getPost({user_id : req.session.user_id}, function(posts) {
                    postDao.getPost({post_id:req.params.id}, function(post) {
                        res.render('edit', {
                            posts,
                            user : {
                                title: req.session.title,
                                first_name: req.session.first_name,
                                last_name: req.session.last_name,
                                avatar: req.session.avatar
                            },
                            logged: req.session && req.session.user_id,
                            post : post[0]
                        });
                    });
                });
            }
        });

        // res.redirect('back');
    });

    app.get('/addPost', function(req, res){
        if(!req.session || !req.session.user_id) {
            res.redirect('/login');
            return;
        }

        postDao.getPost({user_id : req.session.user_id}, function(posts) {
            res.render('addArticle', {
                posts,
                logged: req.session && req.session.user_id,
                user : {
                    title: req.session.title,
                    first_name: req.session.first_name,
                    last_name: req.session.last_name,
                    avatar: req.session.avatar
                },
                postData : null,
                commentData : null,
            });
        });
    });
    
    app.get('/:id', function(req, res){
        postDao.getPosts(12, function(posts) {
            postDao.getPostAndUser(req.params.id, function(postData) {
                commentDao.getCommentsAndUsers(req.params.id, function(commentData) {
                    res.render('index', {
                        posts : posts,
                        user : {
                            title: req.session.title,
                            first_name: req.session.first_name,
                            last_name: req.session.last_name,
                            avatar: req.session.avatar
                        },
                        logged: req.session && req.session.user_id,
                        postData : postData[0],
                        commentData : commentData,
                    });
                });
            });
        });
        
    });

    app.post('/:id', bodyParser, function(req, res) {
        if(!req.session || !req.session.user_id) {
            res.redirect('/login');
            return;
        }

        commentDao.addComment({
            user_id : req.session.user_id,
            post_id : req.params.id,
            comment_content : req.body.comment_content,
        });
        res.redirect('back');
    });

    app.get('/user/removePost/:id', function(req, res){
        if(!req.session || !req.session.user_id) {
            res.redirect('/login');
            return;
        }

        postDao.getPostAndUser(req.params.id, function(row) {
            if(row[0] != undefined && req.session.user_id == row[0].user_id) {
                postDao.removePost(req.params.id);
            }
        })

        res.redirect('back');
    });

    app.post('/user/addPost', bodyParser, function(req, res){
        if(!req.session || !req.session.user_id) {
            res.redirect('/login');
            return;
        }
        if(req.body.thumb) {
            postDao.addPost({
                post_title : req.body.title,
                post_content : req.body.content,
                thumb : req.body.thumb,
                user_id : req.session.user_id,
            });
        }
        else {
            postDao.addPost({
                post_title : req.body.title,
                post_content : req.body.content,
                user_id : req.session.user_id,
            });
        }
        res.redirect('back');
    });

    app.post('/user/edit/:id', bodyParser, function(req, res){
        if(!req.session || !req.session.user_id) {
            res.redirect('/login');
            return;
        }

        if(req.body.thumb) {
            postDao.updatePost({
                post_title : req.body.title,
                post_content : req.body.content,
                thumb : req.body.thumb
            });
        }
        else {
            postDao.updatePost({
                post_title : req.body.title,
                post_content : req.body.content
            }, req.params.id);
        }
        
        res.redirect('/addPost');
    });
};