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
