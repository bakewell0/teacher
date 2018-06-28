var express = require('express');
var router = express.Router();
var supplier = require("../model.js").supplier;
// force: true will drop the table if it already exists
supplier.sync({force: true}).then(() => {
  
});

module.exports = router;