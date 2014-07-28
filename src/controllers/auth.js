var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var UserRepo = require('../domain/user-repo');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

//TODO: cleanup
passport.use(new GoogleStrategy({
    clientID: '784299102008-eq65dau7dsjuo474ed18hpdo71tptc3h.apps.googleusercontent.com',
    clientSecret: '_bvcIo2PMW2EBHrABAJxYo7z',
    //FIXME
    callbackURL: 'http://127.0.0.1:5000/auth/google/return',
    scope: 'profile'
}, function(accessToken, refreshToken, profile, done) {
    UserRepo.findUserByGoogleId(profile.id).then(
        function(user) {
            if(!user) {
                UserRepo.addGoogleUser(profile).then(
                    function(user) {done(null, user);},
                    function(err) {console.log(err);}
                )
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

exports.googleAuth = passport.authenticate('google');

exports.googleAuthReturn = passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
});
