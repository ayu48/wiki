var mongoose = require('mongoose');
var pages = require('../models/pages');
module.exports.controller = function(app) {

    app.get('/', function(req,res) {
        res.redirect('/top');
    })

    app.get('/top', function(req, res) {
        pages.load(function(err, pages) {
            if (err) console.log(err);
            res.render('index', {
                pages: pages
            });
        });
    });

}