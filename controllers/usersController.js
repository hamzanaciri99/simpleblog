var bodyParser = require('body-parser').urlencoded({extended: false});
var postDao = require('../modele/postsDao');
var userDao = require('../modele/usersDao');

const SESSION_AGE = 3600000 * 24 * 30; //30 day



module.exports = function(app) {

    app.get('/account', function(req, res){
        if(!req.session || !req.session.user_id) {
            res.redirect('/login');
            return;
        }

        res.render('account', {
            user : {
                user_id: req.session.user_id,
                first_name: req.session.first_name,
                last_name: req.session.last_name ,
                user_name: req.session.user_name,
                email: req.session.email,
                password: req.session.password,
                title: req.session.title,
                avatar: req.session.avatar
            }
        })

    });

    app.post('/user/changeAvatar', bodyParser, function(req, res){
        if(!req.session || !req.session.user_id) {
            res.redirect('/');
            return;
        }

        userDao.updateUser({
            avatar : req.body.thumb
        }, {
            user_id: req.session.user_id
        });

        res.redirect('back');
    });

    app.post('/user/signup', bodyParser, function(req, res){
        if(req.session && req.session.user_id) {
            res.redirect('/');
            return;
        }

        userDao.addUser( {
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            user_name : req.body.user_name,
            email : req.body.email,
            password : req.body.password,
            title : req.body.title
        } );
        res.redirect('back');
    });

    app.post('/user/login', bodyParser, function(req, res){
        if(req.session && req.session.user_id) {
            res.redirect('/');
            return;
        }

        userDao.getUser( 
            { user_name : req.body.user_name },
            { email : req.body.user_name },
            { password : req.body.password },
            (data) => {
                req.session.user_id = data.user_id;
                req.session.first_name = data.first_name;
                req.session.last_name = data.last_name;
                req.session.user_name = data.user_name;
                req.session.email = data.email;
                req.session.password = data.password;
                req.session.title= data.title;
                req.session.avatar = data.avatar;
                req.session.cookie.expires = new Date(Date.now() + SESSION_AGE)
                req.session.cookie.maxAge = SESSION_AGE
                res.redirect('/addPost');
            },
            (err) => {
                console.log(err)
                res.redirect('/login?yes=false');
        } );
    });

    app.get('/user/logout', bodyParser, function(req, res) {
        if(!req.session || !req.session.user_id) {
            res.redirect('/login');
            return;
        }

        req.session.destroy((err) => {
            res.redirect('/');
        })
    })
    
};