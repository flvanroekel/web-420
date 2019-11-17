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

var User = mongoose.model('User', userSchema); //set user schema as exportable so other pages can use object
module.exports = User;

//database queries happen here
module.exports.add = (user, callback) => { //add the user to the database
  user.save(callback);
};

module.exports.getById = (id, callback) => { //get user by id
  var query = { _id: id };
  User.findById(query, callback);
};