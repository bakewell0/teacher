var express = require('express');
var router = express.Router();
var wharehouse = require("../model.js").wharehouse;
// force: true will drop the table if it already exists
wharehouse.sync({force: true}).then(() => {
  
});

module.exports = router;