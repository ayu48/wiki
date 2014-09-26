var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, default: ''},
    provider: { type: String, default: ''},
    google: {}
});

var User = mongoose.model('User', userSchema);

module.exports = {
    createUserModelFromGoogleProfile: function(googleProfile) {
        return new User ({
            provider: 'google',
            google: googleProfile._json
        });
    }
};
