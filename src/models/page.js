var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

// Page Schema
var pageSchema = new Schema({
    title: String,
    content: String,
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

    delete: function(pageId, cb) {
        mongoose.model('Page').findById(pageId).remove().exec(cb);
    }
}

mongoose.model('Page', pageSchema);
