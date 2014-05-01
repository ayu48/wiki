var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

// Page Schema
var pageSchema = new Schema({
    title: String,
    content: String,
    mtime: Number,
    ctime: Number
});


// Statics
pageSchema.statics = {
    loadAll: function(cb) {
        this.find().exec(cb);
    },

    loadPage: function(pageId, cb) {
        this.findById(pageId).exec(cb);
    }
}

mongoose.model('Page', pageSchema);
