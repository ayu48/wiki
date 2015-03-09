var Promise = require('promise');
var PageFactory = require('./page-factory');
var mongoose = require('mongoose');

module.exports = {

    getPage: function(pageId) {

        return mongoose.model('Page').findById(pageId).exec();

    },

    getPageWithChildPages: function(pageId) {

        var getPageReq = mongoose.model('Page').findById(pageId).exec();

        var childPagesReq = mongoose.model('Page').find({'parent_id': pageId}).exec();

        return Promise.all([getPageReq, childPagesReq]);

    },

    getAllPages: function() {

        return mongoose.model('Page').find().exec();

    },

    getAllPagesByUsername: function(username) {

        return mongoose.model('Page').find({'author': username}).exec();

    },

    createPage: function(title, author, body, parentId) {

        return new Promise(function(resolve, reject) {

            var newPage = PageFactory.createPageModel(title, author, body, parentId);

            // Model#save doesn't return a promise for the moment,
            // but going to start returning a promise at the version 4.0
            // see https://github.com/LearnBoost/mongoose/issues/1431
            newPage.save(function(err, page){
                if (err) reject(err);
                else resolve(page);
            });

        });

    },

    updatePage: function(pageId, title, body) {

        return mongoose.model('Page').findByIdAndUpdate(pageId, {

            $set: {
                title: title,
                body: body,
                mtime: new Date().getTime()
            }

        }).exec();

    },

    deletePage: function(pageId) {

        return mongoose.model('Page').findById(pageId).remove().exec();

    }

};
