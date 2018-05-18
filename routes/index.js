var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'tttt' });
});

router.get('/team/:tm', function(req, res, next) {
    let tm = req.body.params;
    //get team info from redis using :tm

  res.render('teampage',{teamname:tm});
});

module.exports = router;
