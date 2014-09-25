require('./user-repo.js');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
    createUserModelFromGoogleProfile: function(googleProfile) {
        return new User ({
            provider: 'google',
            google: googleProfile._json
        });
    }
};
