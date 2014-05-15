var mongoose = require('mongoose');
var PageModel = mongoose.model('Page');

var page;

exports.index = function (req, res) {
    PageModel.loadPage(req.params.id, function(err, pageInfo) {
        page = pageInfo;
        res.render('page', {
            page: pageInfo
        });
    });
}

exports.delete = function (req, res) {
    page.delete(req.params.id, function(err) {
        if (err) console.log(err);
        res.send();
    });
}