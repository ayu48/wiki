var Promise = require('promise');
var UserClient = require('./user');
var UserFactory = require('./user-factory');

module.exports = {

    findUserById: function(userId) {
        return new Promise(function(resolve, reject) {
            UserClient.findUserById(userId, function(err, user) {
                if (err) reject(err);
                else resolve(user);
            });
        });
    },

    findUserByGoogleId: function(id) {
        return new Promise(function(resolve, reject) {
            UserClient.findUserByGoogleId(id, function(err, user) {
                if (err) reject(err);
                else resolve(user);
            });
        });
    },

    addGoogleUser: function(googleProfile) {
        return new Promise(function(resolve, reject) {
            UserClient.addGoogleUser(
                UserFactory.createUserModelFromGoogleProfile(googleProfile),
                function(err, user) {
                    if (err) reject(err);
                    else resolve(user);
                }
            );
        });
    },

    setUsername: function(username, userId) {
        return new Promise(function(resolve, reject) {
            UserClient.setUsername(
                username,
                userId,
                function(err, user) {
                    if (err) reject(err);
                    else resolve(user.username);
                }
            );
        });
    },

    checkUsernameAvailability: function(username) {
        return new Promise(function(resolve, reject) {
            UserClient.findByUsername(
                username,
                function(err, user) {
                    if (err) reject(err);
                    else resolve(user !== []);
                }
            );
        });
    }
};
