/*
============================================
; Title:  config.js
; Author: Faye Van Roekel
; Date:   19 October 2019
; Description: new file in api-gateway
;===========================================
*/

var config = {};

config.web = {};

config.web.port = process.env.PORT || '3000';

module.exports = config;