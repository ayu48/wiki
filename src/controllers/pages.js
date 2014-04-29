var mongoose = require('mongoose');
var pages = require('../models/pages');

exports.top = function (req, res) {
    pages.load(function(err, pages) {
        if (err) console.log(err);
        res.render('index', {
            pages: pages
        });
    });
}
