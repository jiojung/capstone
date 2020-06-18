const express = require('express');
const app = express();
const passport = require('passport');
const cors = require('cors');
app.use(cors());
// const SteamStrategy = require('passport-steam').Strategy;


app.use(passport.initialize());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// passport.use(new SteamStrategy({
//     returnURL: 'http://localhost:3000/auth/steam/return',
//     realm: 'http://localhost:3000/',
//     apiKey: 'A9AF4EC788FFD1B9A079A36B0A93BDFC',
//     stateless:true
//   },
//   function(identifier, profile, done) {

//     profile.identifier = identifier;
//     return done(null, profile);
//   }
// ));
var OpenIDStrategy = require('passport-openid').Strategy;
var SteamStrategy = new OpenIDStrategy({
        // OpenID provider configuration
        providerURL: 'http://steamcommunity.com/openid',
        stateless: true,
        // How the OpenID provider should return the client to us
        returnURL: 'http://localhost:3000/auth/openid/return',
        realm: 'http://localhost:3000/',
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
  // For this demo, we'll just return an object literal since our user
  // objects are this trivial.  In the real world, you'd probably fetch
  // your user object from your database here.
  done(null, {
      identifier: identifier,
      steamId: identifier.match(/\d+$/)[0]
  });
});

app.get('/auth/openid', passport.authenticate('openid'));

app.use(passport.initialize());
app.use(passport.session());

// app.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('http://localhost:3000/');
// });

// app.get('/auth/steam',
//   passport.authenticate('steam'),
//   function(req, res) {
//     // The request will be redirected to Steam for authentication, so
//     // this function will not be called.
//   });

// app.get('/auth/steam/return',
//   passport.authenticate('steam', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     if (req.user) {
//       res.redirect('http://localhost:4000/?steamid=' + req.user.steamId);
//   } else {
//       res.redirect('http://localhost:3000/?failed');
//   }
//   });

app.get('/auth/openid/return', passport.authenticate('openid'),
    function(request, response) {
        if (request.user) {
            response.redirect('/?steamid=' + request.user.steamId);
        } else {
            response.redirect('/?failed');
        }
});

app.get('/auth/logout', function(request, response) {
  request.logout();
  // After logging out, redirect the user somewhere useful.
  // Where they came from or the site root are good choices.
  response.redirect(request.get('Referer') || '/')
});


app.listen(4000, () => {
    console.log('Server Started on http://localhost:4000');
});
