require('./page.js');
var mongoose = require('mongoose');
var Page = mongoose.model('Page');

module.exports = {
    createPageModel: function(title, body) {
        return new Page ({
            title: title,
            content: body,
            mtime: new Date().getTime(),
            ctime: new Date().getTime()
        });
    }
}