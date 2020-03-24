var express = require('express');
var publishController = require('../src/publish');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homesfy SMS Portal', name: 'Homesfy' });
});

router.post('/publish', publishController.publish)

module.exports = router;
