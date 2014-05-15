// Controllers
var page = require('./src/controllers/page');
var top = require('./src/controllers/top');


// Expose Routes
module.exports = function (app) {
    // Get
    app.get('/', top.index);
    app.get('/page/add', page.newPageForm);
    app.get('/page/:id', page.index);
    app.get('*', function(req, res) {
        res.redirect('/');
    });

    // Delete
    app.post('/page/add', page.savePage);
    app.del('/page/:id', page.delete);

}
