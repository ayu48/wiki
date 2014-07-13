var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: '784299102008-eq65dau7dsjuo474ed18hpdo71tptc3h.apps.googleusercontent.com',
    clientSecret: '_bvcIo2PMW2EBHrABAJxYo7z',
    callbackURL: 'http://127.0.0.1:5000/auth/google/return',
    scope: 'profile'
}, function(accessToken, refreshToken, profile, done) {
    /* TODO
    - find user
    - if not found, save
    - return user
     */
    done(null, accessToken);
}));

exports.googleAuth = passport.authenticate('google');

exports.googleAuthReturn = passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
});
