var mongoose = require('mongoose');
var pages = mongoose.model('Page');

exports.index = function (req, res) {
    pages.load(function(err, pages) {
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
