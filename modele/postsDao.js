var mysql = require('mysql');
var connection = mysql.createConnection({
	host	: 'localhost',
	user 	: 'root',
	password: '',
	database : 'mysimpleblog' 
});

connection.connect();

function getPosts(limit, callback) {
    connection.query("SELECT * FROM posts ORDER BY post_date DESC LIMIT ?", limit, function(err, res, fields){
        if (err){
            throw err;
        }
        else {
            callback(res)
        }
    });
}

function getPostsCount(callback) {
    connection.query("SELECT COUNT(*) AS postsCount FROM posts", function(err, res, fields){
        if (err){
            throw err;
        }
        else {
            callback(res[0].postsCount);
        }
    });
}

function getPost(cond, callback) {
    connection.query("SELECT * FROM posts WHERE ?", cond, function(err, res, fields){
        if (err){
            throw err;
        }
        else {
            callback(res);
        }
    });
}

function getPostAndUser(postID, callback) {
    connection.query("SELECT * FROM posts JOIN users ON posts.user_id = users.user_id WHERE post_id = ?", postID, function(err, res, fields){
        if (err){
            throw err;
        }
        else {
            callback(res);
        }
    });
}

function addPost(post) {
    connection.query("INSERT INTO posts SET ?", post, function(err, res, fields){
        if (err) throw err;
    });
}

function removePost(postID) {
    connection.query("DELETE FROM posts WHERE post_id = ?", [postID], function(err, res, fields){
        if (err) throw err;
    });
}

function updatePost(post) {
    connection.query("UPDATE posts SET ?", post, function(err, res, fields){
        if (err) throw err;
    });
}

module.exports = {
    endConnection: function() {
        connection.end();
    },
    addPost     : addPost,
    getPost     : getPost,
    getPosts    : getPosts,
    getPostsCount: getPostsCount,
    removePost  : removePost,
    updatePost  : updatePost,
    getPostAndUser : getPostAndUser,
};