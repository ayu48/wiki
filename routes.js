// Controllers
var page = require('./src/controllers/page');
var top = require('./src/controllers/top');


// Expose Routes
module.exports = function (app) {
    // Get
    app.get('/', top.index);
    app.get('/page/add', page.newPage);
    app.get('/page/add/:id', page.newPage);
    app.get('/page/edit/:id', page.editPage);
    app.get('/page/:id', page.index);
    app.get('*', function(req, res) {
        res.redirect('/');
    });

    // Post
    app.post('/page/add', page.createPage);
    app.post('/page/add/:id', page.createPage);
    app.post('/page/edit/:id', page.updatePage);
    app.post('/markdown_preview', page.markdownPreview);

    // Delete
    app.del('/page/:id', page.delete);

}
