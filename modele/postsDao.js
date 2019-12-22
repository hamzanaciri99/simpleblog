var mysql = require('mysql');
var connection = mysql.createConnection({
	host	: 'remotemysql.com',
	user 	: '4TRwdXT4am',
	password: 'Yn5NHeekdn',
	database : '4TRwdXT4am' 
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

function updatePost(post, post_id) {
    connection.query("UPDATE posts SET ? where post_id = ? ", [post, post_id], function(err, res, fields){
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