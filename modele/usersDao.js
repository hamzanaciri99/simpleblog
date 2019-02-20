var mysql = require('mysql');
var connection = mysql.createConnection({
	host	: 'localhost',
	user 	: 'root',
	password: '',
	database : 'mysimpleblog' 
});

connection.connect();

function getUser(user, callback) {
    connection.query("SELECT * FROM users WHERE ?", user, function(err, res, fields){
        if (err){
            throw err;
        }
        else {
            callback(res);
        }
    });
}

function getUserAndPosts(userID, callback) {
    connection.query("SELECT * FROM posts JOIN users ON posts.user_id = users.user_id WHERE user_id = ?", userID, function(err, res, fields){
        if (err){
            throw err;
        }
        else {
            callback(res);
        }
    });
}


function addUser(user) {
    connection.query("INSERT INTO users SET ?", user, function(err, res, fields){
        if (err) throw err;
    });
}

function removeUser(userID) {
    connection.query("DELETE FROM users WHERE user_id = ?", [userID], function(err, res, fields){
        if (err) throw err;
    });
}

function updateUser(user) {
    connection.query("UPDATE users SET ?", user, function(err, res, fields){
        if (err) throw err;
    });
}

module.exports = {
    endConnection: function() {
        connection.end();
    },
    addUser     : addUser,
    getUser    : getUser,
    removeUser  : removeUser,
    updateUser  : updateUser,
    getUserAndPosts : getUserAndPosts,
};
