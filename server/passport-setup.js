const express = require('express');
const app = express();
const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;

app.use(passport.initialize());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/auth/steam/return',
    realm: 'http://localhost:3000/',
    apiKey: 'A9AF4EC788FFD1B9A079A36B0A93BDFC',
    stateless:true
  },
  function(identifier, profile, done) {

    profile.identifier = identifier;
    return done(null, profile);
  }
));