var express = require('express');
var router = express.Router();
const { requireAuth } = require("../auth");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title1: "MOMENTUM"});
});

router.get('/post/new',requireAuth, function(req, res, next) {
  res.render('post', {title1: "MOMENTUM"});
});

module.exports = router;
