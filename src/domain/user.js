var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {type: String, default: ''},
    username: {type: String, default: ''},
    hashed_password: {type: String, default: ''},
    authToken: {type: String, default: ''},
    provider: { type: String, default: ''},
    google: {}
});

module.exports = {
    findUserById: function(userId, cb) {
        mongoose.model('User').findById(userId).exec(cb);
    },

    findUserByGoogleId: function(id, cb) {
        mongoose.model('User').findOne({ 'google.id': id}).exec(cb);
    },

    addGoogleUser: function(user, cb) {
        user.save(cb);
    }
};

mongoose.model('User', userSchema);