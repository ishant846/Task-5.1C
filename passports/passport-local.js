'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../models/user-model');

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });  
});

passport.use('local.login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
}, function(req, email, password, done){
    User.findOne(/*$or:[*/{email : email}/*,{username : email}]*/, function(err, user){
        const messages = [];
        if(err) {
            return done(err, req.flash('error', messages));
        }
        if(!user || !user.comparePassword(password)) {
            messages.push('Email Does Not Exist or Password is Invalid');
            return done(null, false, req.flash('error', messages));
        }
        return done(null, user);
    });
}));

