var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var UserRepo = require('../domain/user-repo');

exports.googleAuth = passport.authenticate('google');

exports.googleAuthReturn = passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
});

passport.use(new GoogleStrategy({
    clientID: '784299102008-eq65dau7dsjuo474ed18hpdo71tptc3h.apps.googleusercontent.com',
    clientSecret: '_bvcIo2PMW2EBHrABAJxYo7z',
    callbackURL: '/auth/google/return',
    scope: 'profile'
}, function(accessToken, refreshToken, profile, done) {
    UserRepo.findUserByGoogleId(profile.id).then(
        function(user) {
            if(!user) {
                this.addGoogleUser(profile);
            }
            else {
                done(null, user);
            }
        },
        function(err) {
            console.log(err);
            done(err);
        }
    )
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

//private
addGoogleUser = function(profile) {
    UserRepo.addGoogleUser(profile).then(
        function(user) {done(null, user);},
        function(err) {console.log(err);}
    )
};
