var mongoose = require('mongoose');
var Page = mongoose.model('Page');
var PageRepo = require('../domain/page-repo');

exports.index = function (req, res) {
    PageRepo.getPage(req.params.id).then(
        function(page) {
            res.render('page', {page: page});
        },
        function (err) {console.log(err)}
    );
}

exports.newPageForm = function (req, res) {
    res.render('add');
}

exports.savePage = function (req, res) {
    PageRepo.createPage(req.body.title, req.body.body).then(
        function(page) {
            res.redirect('/page/' + page._id);
        },
        function(err) {console.log(err)}
    );
}

exports.delete = function (req, res) {
    PageRepo.deletePage(req.params.id).then(
        function() {
            res.send()
        },
        function(err) {console.log(err)}
    );
}