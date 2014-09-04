var Promise = require('promise');
var PageFactory = require('./page-factory');
var PageClient = require('./page');

module.exports = {
    //TODO: erase?
    getPage: function(pageId) {
        return new Promise(function(resolve, reject) {
            PageClient.getPage(pageId, function(err, page) {
                if (err) reject(err);
                else resolve(page);
            });
        });
    },

    getPageWithChildPages: function(pageId) {
        var getPageReq = new Promise(function(resolve, reject) {
            PageClient.getPage(pageId, function(err, page) {
                if (err) reject(err);
                else resolve(page);
            });
        });
        var childPagesReq = new Promise(function(resolve, reject) {
                PageClient.getChildPages(pageId, function(err, pages) {
                    if (err) reject(err);
                    else resolve(pages);
                });
            }
        );
        return new Promise.all([getPageReq, childPagesReq]);
    },

    getAllPages: function() {
        return new Promise(function(resolve, reject) {
            PageClient.loadAll(function(err, pages) {
                if (err) reject(err);
                else resolve(pages);
            });
        });
    },

    getAllPagesByUsername: function(username) {
        return new Promise(function(resolve, reject) {
            PageClient.getAllByUsername(username, function(err, pages) {
                if (err) reject(err);
                else resolve(pages);
            });
        });
    },

    createPage: function(title, author, body, parentId) {
        return new Promise(function(resolve, reject) {
            PageClient.addPage(
                PageFactory.createPageModel(title, author, body, parentId),
                function(err, page) {
                    if (err) reject(err);
                    else resolve(page);
                }
            );
        });
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
};
