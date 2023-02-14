import passport from 'passport';
import express from 'express'
import qs from 'querystring'
import session from "express-session";
const OpenIDConnectStrategy = require('passport-openidconnect');

export const authRouter = express.Router();

passport.use(new OpenIDConnectStrategy({
    issuer: 'https://' + process.env['AUTH0_DOMAIN'] + '/',
    authorizationURL: 'https://' + process.env['AUTH0_DOMAIN'] + '/authorize',
    tokenURL: 'https://' + process.env['AUTH0_DOMAIN'] + '/oauth/token',
    userInfoURL: 'https://' + process.env['AUTH0_DOMAIN'] + '/userinfo',
    clientID: process.env['AUTH0_CLIENT_ID'],
    clientSecret: process.env['AUTH0_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect',
    scope: [ 'profile' ]
}, function verify(issuer:any, profile:any, cb:any) {
    return cb(null, profile);
}));

authRouter.get('/login', passport.authenticate('openidconnect'));

authRouter.get('/oauth2/redirect', passport.authenticate('openidconnect', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, username: user.username, name: user.displayName });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

authRouter.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
authRouter.use(passport.authenticate('session'));


module.exports = authRouter;
