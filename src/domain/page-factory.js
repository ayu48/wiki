require('./page.js');
var mongoose = require('mongoose');
var Page = mongoose.model('Page');

module.exports = {
    createPageModel: function(title, body, parentId) {
        return new Page ({
            title: title,
            body: body,
            mtime: new Date().getTime(),
            ctime: new Date().getTime(),
            parent_id: parentId
        });
    }
}