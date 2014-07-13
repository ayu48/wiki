var marked = require('marked');
var PageRepo = require('../domain/page-repo');

exports.index = function (req, res) {
    PageRepo.getPageWithChildPages(req.params.id).then(
        function(result) {
            res.render('page', {
                page: result[0],
                childPages: result[1]
            });
        },
        function (err) {console.log(err);}
    );
};

exports.newPage = function (req, res) {
    res.render('edit');
};

exports.editPage = function (req, res) {
    PageRepo.getPage(req.params.id).then(
        function(page) {
            res.render('edit', {page: page});
        },
        function (err) {console.log(err);}
    );
};

exports.createPage = function (req, res) {
    PageRepo.createPage(req.body.title, req.body.body, req.params.id).then(
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
