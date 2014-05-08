// Controllers
var pages = require('./src/controllers/pages');


// Expose Routes
module.exports = function (app) {
    // Get
    app.get('/', pages.index);
    app.get('/page/:id', pages.page);
    app.get('*', function(req, res) {
        res.redirect('/');
    });

    // Delete
    app.del('/page/:id', pages.delete);

}
