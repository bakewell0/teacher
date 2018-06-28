var express = require('express');
var router = express.Router();
var afterSale = require("../model.js").afterSale;
// force: true will drop the table if it already exists
afterSale.sync({force: true}).then(() => {
  
});

module.exports = router;