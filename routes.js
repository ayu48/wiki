// Controllers
var pages = require('./src/controllers/pages');


// Expose Routes
module.exports = function (app) {
    app.get('/', pages.top);
    app.get('/top', pages.top);
}
