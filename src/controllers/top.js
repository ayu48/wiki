var mongoose = require('mongoose');
var Page = mongoose.model('Page');

exports.index = function (req, res) {
    Page.loadAll(function(err, pages) {
        if (err) console.log(err);
        res.render('index', {
            pages: pages
        });
    });
}
