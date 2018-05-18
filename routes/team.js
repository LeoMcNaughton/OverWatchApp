var express = require('express');
var router = express.Router();
var redis = require('redis');

let client = redis.createClient();

client.on('connect', function(){
    console.log("Connected to redis... on users route");
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('You did not enter a team');
});


router.get('/:team', function(req, res, next) {

        let team = req.params.team;

      client.keys('*'+team, function(err, data){
          if(err){
              console.log(err);
          }
          else{
              let playerlist = {};

              for(let d=0; d<data.length; d++){
                  let item = "plyr"+d;
                  playerlist[item] = data[d];
              }
              res.render('teampage', playerlist);
          }
      });
});



module.exports = router;
module.exports = router;
