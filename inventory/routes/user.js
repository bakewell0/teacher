var express = require('express');
var router = express.Router();
var user = require("../model.js").user;
// force: true will drop the table if it already exists
user.sync({force: true}).then(() => {
  
});

module.exports = router;