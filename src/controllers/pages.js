var mongoose = require('mongoose');
var pages = mongoose.model('Page');

exports.index = function (req, res) {
    pages.loadAll(function(err, pages) {
        if (err) console.log(err);
        res.render('index', {
            pages: pages
        });
    });
}

exports.page = function (req, res) {
    pages.loadPage(req.params.id, function(err, page) {
        if (err) console.log(err);
        res.render('page', {
            page: page
        });
    });
}

exports.delete = function (req, res) {
    //FIXME: there must be a better way..
    pages.schema.methods.delete(req.params.id, function(err, page) {
        if (err) console.log(err);
    });
}