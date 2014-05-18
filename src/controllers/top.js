var mongoose = require('mongoose');
var PageRepo = require('../models/page-repo');

exports.index = function (req, res) {
    PageRepo.getAllPages().then(
        function(pages) {
            res.render('top', {
                pages: pages
            });
        },
        function(err) {console.log(err)}
    );
}
