var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Page Schema
var pageSchema = new Schema({
    title: String,
    author: String,
    body: String,
    mtime: Number,
    ctime: Number,
    parent_id: String
});

var Page = mongoose.model('Page', pageSchema);

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

