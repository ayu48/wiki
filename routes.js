// Controllers
var authController = require('./src/controllers/auth');
var topController = require('./src/controllers/top');
var pageController = require('./src/controllers/page');
// Authorization
var auth = require('./config/authorization');

// Expose Routes
module.exports = function (app) {
    // Get
    app.get('/', topController.index);
    app.get('/login', function(req, res){ res.render('login');});
    app.get('/page/add', pageController.newPage);
    app.get('/page/add/:id', pageController.newPage);
    app.get('/page/edit/:id', pageController.editPage);
    app.get('/page/:id', pageController.index);
    app.get('/auth/google', authController.googleAuth);
    app.get('/auth/google/return', authController.googleAuthReturn);

    // Post
    app.post('/page/add', pageController.createPage);
    app.post('/page/add/:id', pageController.createPage);
    app.post('/page/edit/:id', pageController.updatePage);
    app.post('/markdown_preview', pageController.markdownPreview);

    // Delete
    app.del('/page/:id', pageController.delete);

};
