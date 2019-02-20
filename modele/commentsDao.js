var mysql = require('mysql');
var connection = mysql.createConnection({
	host	: 'localhost',
	user 	: 'root',
	password: '',
	database : 'mysimpleblog' 
});

connection.connect();

function getComments(cond, callback) {
    connection.query("SELECT * FROM comments WHERE ?", cond, function(err, res, fields){
        if (err){
            throw err;
        }
        else {
            callback(res);
        }
    });
}

function getCommentsAndUsers(postID, callback) {
    connection.query("SELECT * FROM comments JOIN users ON comments.user_id = users.user_id WHERE post_id = ?", postID, function(err, res, fields){
        if (err){
            throw err;
        }
        else {
            callback(res);
        }
    });
}

function addComment(comment) {
    connection.query("INSERT INTO comments SET ?", comment, function(err, res, fields){
        if (err) throw err;
    });
}

function removeComment(commentID) {
    connection.query("DELETE FROM comments WHERE comment_id = ?", [commentID], function(err, res, fields){
        if (err) throw err;
    });
}

function updateComment(content) {
    connection.query("UPDATE comments SET comment_content = ?", [content], function(err, res, fields){
        if (err) throw err;
    });
}

module.exports = {
    endConnection: function() {
        connection.end();
    },
    addComment     : addComment,
    getComments    : getComments,
    removeComment  : removeComment,
    updateComment  : updateComment,
    getCommentsAndUsers : getCommentsAndUsers,
};