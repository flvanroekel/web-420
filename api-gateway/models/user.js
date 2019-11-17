/*
;============================================
; Title:  user.js
; Author: Faye Van Roekel
; Date:   25 October 2019
; Description: part of api-gateway
;===========================================
/ *

/**
 Fields username, password, and email
 */

var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

var User = module.exports = mongoose.model('User', userSchema);


/**
 Database queries
 */

module.exports.add = (user, callback) => {
    user.save(callback);
};


module.exports.getById = (id, callback) => {
    var query = {_id: id};
    User.findById(query, callback);
};