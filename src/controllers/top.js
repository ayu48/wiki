var PageRepo = require('../domain/page-repo');
var UserRepo = require('../domain/user-repo');
var Promise = require('promise');

exports.index = function (req, res) {
    var userReq = new Promise (function(resolve, reject) {
        UserRepo.getAllUsers().then(
            function(users) {
                resolve(users);
            },
            function(err) {
                console.log(err);
                reject();
            }
        );
    });

    var pageReq = new Promise (function(resolve, reject) {
        PageRepo.getAllPages().then(
            function(pages) {
                resolve(pages);
            },
            function(err) {
                console.log(err);
                reject();
            }
        );
    });

    new Promise.all([userReq, pageReq]).then(function(results) {
            console.log(results[0]);
            res.render('top', {
                username: req.user ? req.user.username : null,
                showActionButtons: req.isAuthenticated(),
                users: results[0],
                pages: results[1]
            })
        }
    );
};

/* ===TODO: keep for future use===
exports.userTop = function (req, res) {
    PageRepo.getAllPagesByUsername(req.params.username).then(
        function(pages) {
            res.render('top', {
                username: req.user ? req.user.username : null,
                showActionButtons: req.isAuthenticated(),
                pages: pages
            });
        }
    );
};
*/
