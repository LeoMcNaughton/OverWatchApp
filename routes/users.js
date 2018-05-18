var express = require('express');
var router = express.Router();
var redis = require('redis');

let client = redis.createClient();

client.on('connect', function(){
    console.log("Connected to redis... on users route");
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/addplayer', function(req, res, next) {
  res.render('addplayer')
});


router.post('/addplayer', function(req, res, next) {

       let player = 'player:'+req.body.gamertag+":team:"+req.body.team;
       let gamertag = req.body.gamertag
       let firstname = req.body.firstname;
       let lastname = req.body.lastname;
       let team = req.body.team;
       let Nationality = req.body.Nationality;

       client.hmset(player, [
           'gamertag', gamertag,
           'firstname', firstname,
           'lastname', lastname,
           'team', team,
           'Nationality', Nationality,
       ],function(err,reply){
           if(err){
               console.log(err);
           }
           else{
               console.log(reply);
               res.redirect('/');
           }
       }
       );

});
router.post('/search/', function(req, res, next) {
    let id = 'player:'+req.body.id;
    let team = ':team:'+req.body.team;

     client.hgetall(id+team,function(err,obj){
         if(!obj){
             res.render('error',{
                 error: 'custom 404',
                 title: 'NO!',
                 message: 'The player gamertag you were looking for does not exist in this database.'
             });
         }
         else{
             console.log(obj);
             obj.id = req.body.id;
             console.log(obj);
             res.render('player',{
                 player:obj
             });
         }
     })
});

module.exports = router;
