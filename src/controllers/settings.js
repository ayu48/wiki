var UserRepo = require('../domain/user-repo');

exports.username = function (req, res) {
    res.render('settings/username');
};

exports.usernameAvailability = function (req, res) {
    // TODO check validity
    UserRepo.checkUsernameAvailability(req.body.username).then(
        function(availability) {
            res.send(availability);
        },
        function(err) {console.log(err);}
    );
};

exports.setUsername = function (req, res) {
    //TODO: check validity
    //TODO: check availability
    UserRepo.setUsername(req.body.username, req.user._id).then(
        function(username) {
            res.send(username);
        },
        function(err) {console.log(err)}
    );
}