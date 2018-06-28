var express = require('express');
var router = express.Router();
var staff = require("../model.js").staff;
// force: true will drop the table if it already exists
staff.sync({force: true}).then(() => {
  
});

module.exports = router;