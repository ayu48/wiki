var Promise = require('promise');
var UserFactory = require('./user-factory');
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, default: ''},
    provider: { type: String, default: ''},
    google: {}
});

module.exports = {

    findUserById: function(userId) {
        return new Promise(function(resolve, reject) {
            mongoose.model('User').findById(userId).exec(function(err, user) {
                if (err) reject(err);
                else resolve(user);
            });
        });
    },

    findUserByGoogleId: function(id) {
        return new Promise(function(resolve, reject) {
            mongoose.model('User').findOne({ 'google.id': id}).exec(function(err, user) {
                if (err) reject(err);
                else resolve(user);
            });
        });
    },

    addGoogleUser: function(googleProfile) {
        return new Promise(function(resolve, reject) {
            var newUser = UserFactory.createUserModelFromGoogleProfile(googleProfile);
            newUser.save(function(err, user) {
                if (err) reject(err);
                else resolve(user);
            });
        });
    },

    setUsername: function(username, userId) {
        return new Promise(function(resolve, reject) {
            mongoose.model('User').findByIdAndUpdate(
                userId,
                {$set: {username: username}}
            ).exec(function(err, user) {
                    if (err) reject(err);
                    else resolve(user.username);
                }
            );
        });
    },

    checkUsernameAvailability: function(username) {
        return new Promise(function(resolve, reject) {
            mongoose.model('User').find({'username': username}).exec(function(err, user) {
                if (err) reject(err);
                else resolve(user !== []);
            });
        });
    }
};

mongoose.model('User', userSchema);
