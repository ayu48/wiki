var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

// Page Schema
var pageSchema = new Schema({
    title: String,
    body: String,
    mtime: Number,
    ctime: Number
});

module.exports = {
    loadAll: function(cb) {
        mongoose.model('Page').find().exec(cb);
    },

    loadPage: function(pageId, cb) {
        mongoose.model('Page').findById(pageId).exec(cb);
    },

    addPage: function(newPage, cb) {
        newPage.save(cb);
    },

    updatePage: function(pageId, title, body, cb) {
        mongoose.model('Page').findByIdAndUpdate(
            pageId,
            {$set: {title: title, body: body}},
            cb
        );
    },

    delete: function(pageId, cb) {
        mongoose.model('Page').findById(pageId).remove().exec(cb);
    }
}

mongoose.model('Page', pageSchema);
