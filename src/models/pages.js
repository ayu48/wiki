var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , pageSchema = new Schema({
        title: String,
        content: String,
        mtime: Number,
        ctime: Number
    });

pageSchema.statics = {
    load: function(cb) {
        this.find().exec(cb);
    }
}

Pages = mongoose.model('page', pageSchema);
module.exports = Pages;


