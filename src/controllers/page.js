var marked = require('marked');
var PageRepo = require('../domain/page-repo');
var UserRepo = require('../domain/user-repo');

exports.userMyPage = function (req, res) {
    UserRepo.getUserMyPage(req.params.username).then(
        function(mypage) {
            if (mypage) {
                PageRepo.getPageWithChildPages(mypage).then(
                    function(result) {
                        res.render('pages/page', {
                            user: req.user ? req.user : null,
                            showActionButtons: req.isAuthenticated() && req.user.username === result[0].author,
                            page: result[0],
                            childPages: result[1]
                        });
                    },
                    function (err) {console.log(err);}
                );
            }
            //else error page
        },
        function (err) {console.log(err);}
    );
};

exports.index = function (req, res) {
    PageRepo.getPageWithChildPages(req.params.id).then(
        function(result) {
            res.render('pages/page', {
                user: req.user ? req.user : null,
                showActionButtons: req.isAuthenticated() && req.user.username === result[0].author,
                page: result[0],
                childPages: result[1]
            });
        },
        function (err) {console.log(err);}
    );
};

exports.newPage = function (req, res) {
    res.render('pages/edit', {
        user: req.user ? req.user.user : null
    });
};

exports.editPage = function (req, res) {
    PageRepo.getPage(req.params.id).then(
        function(page) {
            res.render('pages/edit', {
                user: req.user ? req.user : null,
                page: page
            });
        },
        function (err) {console.log(err);}
    );
};

exports.createPage = function (req, res) {
    PageRepo.createPage(req.body.title, req.user.username, req.body.body, req.params.id).then(
        function(page) {
            res.redirect('/page/' + page._id);
        },
        function(err) {console.log(err);}
    );
};

exports.updatePage = function (req, res) {
    PageRepo.updatePage(req.params.id, req.body.title, req.body.body).then(
        function(page) {
            res.redirect('/page/' + page._id);
        },
        function(err) {console.log(err);}
    );
};

exports.delete = function (req, res) {
    PageRepo.deletePage(req.params.id).then(
        function() {
            res.send();
        },
        function(err) {console.log(err);}
    );
};

exports.markdownPreview = function (req, res) {
    res.send(marked(req.body.text));
};
