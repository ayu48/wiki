var UserRepo = require('../domain/user-repo');
var PageRepo = require('../domain/page-repo');

exports.username = function (req, res) {
    res.render('settings/username');
};

exports.usernameAvailability = function (req, res) {
    var username = req.body.username;

    if (!isValidUsername(username)) {
        res.send(400, "Not a valid username :(");
    }

    UserRepo.checkUsernameAvailability(username).then(
        function(isAvailable) {
            res.send(isAvailable);
        },
        function(err) {console.log(err);}
    );
};

exports.setUsername = function (req, res) {
    var username = req.body.username;

    if (!isValidUsername(username)) {
        res.send(400, "Not a valid username :(");
    }

    UserRepo.checkUsernameAvailability(username).then(
        function(isAvailable) {
            if (isAvailable) {
                PageRepo.createPage(username, username).then(
                    function(page) {UserRepo.setUserMyPage(req.user._id, page._id);}
                );
                UserRepo.setUsername(username, req.user._id).then(
                    function(username) {
                        res.redirect('/' + username);
                    },
                    function(err) {console.log(err);}
                );
            } else {
                res.send(400, "Username Not available :(");
            }
        },
        function(err) {console.log(err);}
    );
};

var isValidUsername = function(username) {
    var validName = username.match(/^[a-z0-9_-]{3,15}$/);
    return !!validName;
};