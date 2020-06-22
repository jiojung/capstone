
const express = require('express');
const app = express();
const passport = require('passport');
const request = require('request');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.set('port', 4000);

app.use(passport.initialize());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var OpenIDStrategy = require('passport-openid').Strategy;
var SteamStrategy = new OpenIDStrategy({
        // OpenID provider configuration
        providerURL: 'http://steamcommunity.com/openid',
        stateless: true,
        // How the OpenID provider should return the client to us
        returnURL: 'http://localhost:4000/auth/openid/return',
        realm: 'http://localhost:4000/',
    },
    // This is the "validate" callback, which returns whatever object you think
    // should represent your user when OpenID authentication succeeds.  You
    // might need to create a user record in your database at this point if
    // the user doesn't already exist.
    function(identifier, done) {
        // The done() function is provided by passport.  It's how we return
        // execution control back to passport.
        // Your database probably has its own asynchronous callback, so we're
        // faking that with nextTick() for demonstration.
        process.nextTick(function () {
            // Retrieve user from Firebase and return it via done().
            var user = {
                identifier: identifier,
                // Extract the Steam ID from the Claimed ID ("identifier")
                steamId: identifier.match(/\d+$/)[0]
            };
            // In case of an error, we invoke done(err).
            // If we cannot find or don't like the login attempt, we invoke
            // done(null, false).
            // If everything went fine, we invoke done(null, user).
            return done(null, user);
        });
    });
passport.use(SteamStrategy);

passport.serializeUser(function(user, done) {
  done(null, user.identifier);
});

passport.deserializeUser(function(identifier, done) {
  done(null, {
      identifier: identifier,
      steamId: identifier.match(/\d+$/)[0]
  });
});

app.get('/auth/openid', passport.authenticate('openid'));

app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/openid/return', passport.authenticate('openid'),
    function(request, response) {
        if (request.user) {
            response.redirect('http://localhost:3000/?steamid=' + request.user.steamId);
            // var url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=A9AF4EC788FFD1B9A079A36B0A93BDFC&steamids=' + request.user.steamId;
            // request(url, function(err, response, body) {
            //   if(!err && response.statusCode < 400) {
            //     console.log(body);
            //     res.send(body);
            //   }
            // });
            console.log("this is id", request.user.steamId)
            console.log("this is 2id", request.query.steamid);

        } else {
            response.redirect('http://localhost:3000/?failed');
        }
}); 

app.get('/auth/logout', function(request, response) {
  request.logout();
  response.redirect('http://localhost:3000/')
});

app.get('/getplayersummary', function(req, res) {
  console.log("this is 3id", req.query.steamid);
  var url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=A9AF4EC788FFD1B9A079A36B0A93BDFC&steamids='+req.query.steamid;
    request(url, function(err, response, body) {
      if(!err && response.statusCode < 400) {
        console.log(body);
        res.send(body);
      }
    });	
});

app.get('/getplayergames', function(req, res) {
  var url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=A9AF4EC788FFD1B9A079A36B0A93BDFC&steamid=`+req.query.steamid+`&format=json`;
    request(url, function(err, response, body) {
      if(!err && response.statusCode < 400) {
        console.log(body);
        res.send(body);
      }
    });	
});

app.get('/getplayerrecent', function(req, res) {
  var url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=A9AF4EC788FFD1B9A079A36B0A93BDFC&steamid=`+req.query.steamid+`&format=json`;
    request(url, function(err, response, body) {
      if(!err && response.statusCode < 400) {
        console.log(body);
        res.send(body);
      }
    });	
});

app.get('/getnews', function(req, res) {
  console.log("this is 3id", req.query.steamid);
  var url = `http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=730&count=3&maxlength=300&format=json`;
    request(url, function(err, response, body) {
      if(!err && response.statusCode < 400) {
        console.log(body);
        res.send(body);
      }
    });	
});



app.post('/userinfo', function(request, response) {
      fs.readFile('userdata.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); //now it an object
        console.log("this is obj before", obj[0].steamid);
        console.log("obj length", obj.length)
        // for(let i=0; i<obj.length; i++){
        if(obj.some(steam=>steam.steamid===request.body.steamid)) {
          console.log("you are registered");
        }
        else  {
            obj.push(
              {
                  "steamid": request.body.steamid,
                  "communityvisibilitystate": request.body.communityvisibilitystate,
                  "profilestate": request.body.profilestate,
                  "personaname": request.body.personaname,
                  "commentpermission": request.body.commentpermission,
                  "profileurl": request.body.profileurl,
                  "avatar": request.body.avatar,
                  "avatarmedium": request.body.avatarmedium,
                  "avatarfull": request.body.avatarfull,
                  "avatarhash": request.body.avatarhash,
                  "lastlogoff": request.body.lastlogoff,
                  "personastate": request.body.personastate,
                  "primaryclanid": request.body.primaryclanid,
                  "timecreated": request.body.timecreated,
                  "personastateflags": request.body.personastateflags,
                  "loccountrycode": request.body.loccountrycode,
                  "locstatecode": request.body.locstatecode,
                  "usergames" : request.body.usergames,
                  "userrecent": request.body.userrecent
              })
        } //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('userdata.json', json, 'utf8', ()=>{}); // write it back
        response.json(data);
    }});
})

app.get('/userinfo', function(request, response){
  fs.readFile('userdata.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data); //now it an object
    console.log("obj length", obj.length)
    response.json(obj);
    }
})
})




app.listen(4000, () => {
    console.log('Server Started on http://localhost:4000');
});
