var Promise = require('promise');
var PageFactory = require('./page-factory');
var PageClient = require('./page');
var mongoose = require('mongoose');
var PageModel = mongoose.model('Page');

module.exports = {
    getPage: function(pageId) {
        return new Promise(function(resolve, reject) {
            PageClient.loadPage(pageId, function(err, page) {
                if (err) reject(err);
                else resolve(page);
            });
        });
    },

    getAllPages: function() {
        return new Promise(function(resolve, reject) {
            PageClient.loadAll(function(err, pages) {
                if (err) reject(err);
                else resolve(pages);
            });
        });
    },

    createPage: function(title, body) {
        return new Promise(function(resolve, reject) {
            PageClient.addPage(
                PageFactory.createPageModel(title, body),
                function(err, page) {
                    if (err) reject(err);
                    else resolve(page);
                }
            )
        })
    },

    updatePage: function(pageId, title, body) {
        return new Promise(function(resolve, reject) {
            PageClient.updatePage(pageId, title, body, function(err, page) {
                if (err) reject(err);
                else resolve(page);
            });
        });
    },

    deletePage: function(pageId) {
        return new Promise(function(resolve, reject) {
            PageClient.delete(pageId, function(err) {
                if (err) reject(err);
                else resolve();
            });
        });
    }
}
