/*
============================================
; Title:  authController.js
; Author: Faye Van Roekel
; Date:   25 October 2019
; Description: part of api-gateway
;===========================================
*/
/***
 *
 * Controller that handles all user functions for the application
 *
***/
//import user schema
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

//Register a new user when POSTed
exports.user_register = function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);  //take plain text password sent from request form and hash it

  var newUser = new User({ //get all request form controls and store in User object
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email
  });

  User.add(newUser, (err, user) => {
    if (err)
      return res.status(500).send('There was a problem registering the user.');

    var token = jwt.sign({ id: user._id }, config.web.secret, { //sign the user with the secret key stored in web configuration file
      expiresIn: 86400
    });

    res.status(200).send({ auth: true, token: token }); //send authenticated true along with the token??
  });
};

//verify the token when GET issued
exports.user_token = (req, res) => {
  var token = req.headers['x-access-token']; //set the headers to allow token

  if (!token)
    return res.status(401).send({ auth: false, message: 'No token provided' }); //send unauthorized message with not authenticated

  jwt.verify(token, config.web.secret, function(err, decoded) { //compare token with secret key
    if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token. ' });
    console.log(decoded.id)
    User.getById(decoded.id, function(err, user) { //query the user by id
      if (err)
        return res.status(500).send('There was a problem finding the user.'); //server error
      if (!user)
        return res.status(404).send('No user found.'); //not found error
      res.status(200).send(user); //if found send send the user in the response
    });
  });
}