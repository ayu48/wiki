var Promise = require('promise');
var PageFactory = require('./page-factory');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
    //TODO: erase?
    getPage: function(pageId) {
        return new Promise(function(resolve, reject) {
            mongoose.model('Page').findById(pageId).exec(function(err, page) {
                if (err) reject(err);
                else resolve(page);
            });
        });
    },

    getPageWithChildPages: function(pageId) {
        var getPageReq = new Promise(function(resolve, reject) {
            mongoose.model('Page').findById(pageId).exec(function(err, page) {
                if (err) reject(err);
                else resolve(page);
            });
        });
        var childPagesReq = new Promise(function(resolve, reject) {
            mongoose.model('Page').find({'parent_id': pageId}).exec(function(err, pages) {
                if (err) reject(err);
                else resolve(pages);
            });
        });
        return new Promise.all([getPageReq, childPagesReq]);
    },

    getAllPages: function() {
        return new Promise(function(resolve, reject) {
            mongoose.model('Page').find().exec(function(err, pages){
                if (err) reject(err);
                else resolve(pages);
            });
        });
    },

    getAllPagesByUsername: function(username) {
        return new Promise(function(resolve, reject) {
            mongoose.model('Page').find({'author': username}).exec(function(err, pages){
                if (err) reject(err);
                else resolve(pages);
            });
        });
    },

    createPage: function(title, author, body, parentId) {
        return new Promise(function(resolve, reject) {
            var newPage = PageFactory.createPageModel(title, author, body, parentId);
            newPage.save(function(err, page){
                if (err) reject(err);
                else resolve(page);
            });
        });
    },

    updatePage: function(pageId, title, body) {
        return new Promise(function(resolve, reject) {
            mongoose.model('Page').findByIdAndUpdate(
                pageId,
                {$set: {title: title, body: body, mtime: new Date().getTime()}},
                function(err, page) {
                    if (err) reject(err);
                    else resolve(page);
                }
            );
        });
    },

    deletePage: function(pageId) {
        return new Promise(function(resolve, reject) {
            mongoose.model('Page').findById(pageId).remove().exec(function(err) {
                if (err) reject(err);
                else resolve();
            });
        });
    }
};
