var PageRepo = require('../domain/page-repo');

exports.index = function (req, res) {
    PageRepo.getAllPages().then(
        function(pages) {
            res.render('top', {
                pages: pages
            });
        },
        function(err) {console.log(err);}
    );
};
