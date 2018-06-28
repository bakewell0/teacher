var express = require('express');
var router = express.Router();
var goods = require("../model.js").goods;
// force: true will drop the table if it already exists
goods.sync({force: true}).then(() => {
  
});

module.exports = router;