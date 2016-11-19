var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	 req.session.userId = "me是session啊";
  res.render('index', { title: '147852' });
});

module.exports = router;
