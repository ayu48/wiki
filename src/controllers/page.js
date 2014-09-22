var marked = require('marked');
var PageRepo = require('../domain/page-repo');

exports.index = function (req, res) {
    PageRepo.getPageWithChildPages(req.params.id).then(
        function(result) {
            res.render('pages/page', {
                isLoggedIn: req.isAuthenticated(),
                showActionButtons: req.isAuthenticated(),
                page: result[0],
                childPages: result[1]
            });
        },
        function (err) {console.log(err);}
    );
};

exports.newPage = function (req, res) {
    res.render('pages/edit', {
        isLoggedIn: req.isAuthenticated()
    });
};

exports.editPage = function (req, res) {
    PageRepo.getPage(req.params.id).then(
        function(page) {
            res.render('pages/edit', {
                isLoggedIn: req.isAuthenticated(),
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
