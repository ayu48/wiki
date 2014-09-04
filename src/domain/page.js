var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

// Page Schema
var pageSchema = new Schema({
    title: String,
    author: String,
    body: String,
    mtime: Number,
    ctime: Number,
    parent_id: String
});

module.exports = {
    //TODO rename to getAll
    loadAll: function(cb) {
        mongoose.model('Page').find().exec(cb);
    },

    getPage: function(pageId, cb) {
        mongoose.model('Page').findById(pageId).exec(cb);
    },

    addPage: function(newPage, cb) {
        newPage.save(cb);
    },

    getChildPages: function(parentId, cb) {
        mongoose.model('Page').find({'parent_id': parentId}).exec(cb);
    },

    updatePage: function(pageId, title, body, cb) {
        mongoose.model('Page').findByIdAndUpdate(
            pageId,
            {$set: {title: title, body: body, mtime: new Date().getTime()}},
            cb
        );
    },

    delete: function(pageId, cb) {
        mongoose.model('Page').findById(pageId).remove().exec(cb);
    }
};

mongoose.model('Page', pageSchema);
