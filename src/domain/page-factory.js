require('./page.js');
var mongoose = require('mongoose');
var Page = mongoose.model('Page');

module.exports = {
    createPageModel: function(title, author, body, parentId) {
        return new Page ({
            title: title,
            author: author,
            body: body,
            mtime: new Date().getTime(),
            ctime: new Date().getTime(),
            parent_id: parentId
        });
    }
};
