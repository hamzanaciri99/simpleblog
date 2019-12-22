// import { createConnection } from 'mysql';
var mysql = require('mysql');
var connection = mysql.createConnection({
	host	: 'localhost',
	user 	: 'root',
	password: '',
	database : 'mysimpleblog' 
});

connection.connect();

function getUser(username, email, password, callback, callbackerr) {
    connection.query("SELECT * FROM users WHERE (? OR ?) AND ?", [username, email, password], function(err, res, fields){
        if (err){
            callbackerr(err);
        }
        else {
            callback(res[0]);
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

function updateUser(user, cond) {
    connection.query("UPDATE users SET ? WHERE ?", [ user, cond ], function(err, res, fields){
        if (err) throw err;
    });
}

module.exports.endConnection =function endConnection() {
    connection.end();
}

module.exports.addUser = addUser;
module.exports.getUser = getUser;
module.exports.removeUser = removeUser;
module.exports.updateUser = updateUser;
module.exports.getUserAndPosts = getUserAndPosts;
