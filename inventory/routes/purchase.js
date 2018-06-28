var express = require('express');
var router = express.Router();
var purchase = require("../model.js").purchase;
// force: true will drop the table if it already exists
purchase.sync({force: true}).then(() => {
  
});

module.exports = router;