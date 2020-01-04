const express = require("express");
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
require('dotenv').config();


router.get('/index', (req, res) => res.json({msg : "User"}))

// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
    
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

  
// Configure the Facebook strategy for use by Passport.
passport.use(new Strategy({
    clientID: process.env['FACEBOOK_CLIENT_ID'],
    clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
    callbackURL: 'http://localhost:3000/api/v1/user/return',
    profile: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    //Check the DB to find a User with the profile.id
    User.findOne({ facebook_id: profile.id }, function(err, user) {
      if(err) {
        console.log(err);  // handle errors!
      }
      
      if (user) {
        done(null, user); //If User already exists login as stated on line 93
      } else { //else create a new User
        user = new User({
          facebookId: profile.id, //pass in the id and displayName params from Facebook
          name: profile.displayName
        });
        if (typeof profile.emails != 'undefined' && profile.emails.length > 0) //Check if a User signed up with email and add it to the DB
          user.email = profile.emails[0].value;
        user.save(function(err) { //Save User if there are no errors else redirect to login as stated on line 96
          if(err) {
            console.log(err);  // handle errors!
          } else {
            console.log("saving user ...");
            done(null, user);
          }
        });
      }
    });
  }
));

// Initialize Passport and restore authentication state, if any, from the
// session.
router.use(passport.initialize());
router.use(passport.session());

// Define routes.

//GET ALL Users
router.get('/home', (req, res) => {
  User.find()
  .select("_id name facebook_id email")
  .exec()
  .then(results => {
    responses = {
      count: results.length,
      users: results.map(result => {
        return {
          _id: result._id,
          name: result.name,
          facebook_id: result.facebook_id,
          email: result.email
        }
      })
    }
    res.status(200).json(responses);
    console.log(responses);
  })

  .catch(error => {
    res.status(500).json({
      error: error
    });
  });
 });

//GET One User

router.get('/login', (req, res) => { res.json({msg: "login failed"}); });

router.get('/login/facebook', passport.authenticate('facebook'));

router.get('/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/api/v1/user/home');
});

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.json(`Profile ${ req.user }`);
});

module.exports = router;