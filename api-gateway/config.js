/*
============================================
; Title:  config.js
; Author: Faye Van Roekel
; Date:   19 October 2019
; Updated: 25 October 2019
; Description: new file in api-gateway
;===========================================
*/

var config = {};

config.web = {};

config.web.port = process.env.PORT || '3000';

config.web.secret = 'topsecret';

module.exports = config;
