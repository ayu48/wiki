var mongoose = require('mongoose');
var Page = mongoose.model('Page');

var pageScheme;

exports.index = function (req, res) {
    Page.loadPage(req.params.id, function(err, pageInfo) {
        pageScheme = pageInfo;
        res.render('page', {
            page: pageInfo
        });
    });
}

exports.newPageForm = function (req, res) {
    res.render('add');
}

exports.savePage = function (req, res) {
    Page.addPage(
        new Page({
            title: req.body.title,
            content: req.body.body,
            mtime: new Date().getTime(),
            ctime: new Date().getTime()
        }),
        function(err, page) {
            if (err) console.log(err);
            res.render('page', {
                page: page
            })
        }
    )
}

exports.delete = function (req, res) {
    pageScheme.delete(req.params.id, function(err) {
        if (err) console.log(err);
        res.send();
    });
}