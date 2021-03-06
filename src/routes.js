// Controllers
var authController = require('./controllers/auth');
var topController = require('./controllers/top');
var pageController = require('./controllers/page');
var settingsController = require('./controllers/settings');
// Authorization
var auth = require('./authorization');

// Expose Routes
module.exports = function (app) {
    // Get
    app.get('/', topController.index);
    app.get('/login', authController.login);
    app.get('/logout', authController.logout);
    app.get('/:username', pageController.userMyPage);
    app.get('/settings/username', auth.requiresLogin, settingsController.username);
    app.get('/page/add', auth.requiresLogin, pageController.newPage);
    app.get('/page/add/:id', auth.requiresLogin, pageController.newPage);
    app.get('/page/edit/:id', auth.requiresLogin, pageController.editPage);
    app.get('/page/:id', pageController.index);
    app.get('/auth/google', authController.googleAuth);
    app.get('/auth/google/return', authController.googleAuthReturn, authController.googleAuthSuccess);

    // Post
    app.post('/page/add', auth.requiresLogin, pageController.createPage);
    app.post('/page/add/:id', auth.requiresLogin, pageController.createPage);
    app.post('/page/edit/:id', auth.requiresLogin, pageController.updatePage);
    app.post('/markdown_preview', pageController.markdownPreview);
    app.post('/username_availability', settingsController.usernameAvailability);
    app.post('/set_username', settingsController.setUsername);

    // Delete
    app.del('/page/:id', pageController.delete);

};
