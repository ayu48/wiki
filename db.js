var mongoose = require('mongoose');

exports.connectMongoDB = function() {
    mongoose.connect('mongodb://guest:guest@oceanic.mongohq.com:10034/app24336356', function(error) {
        if (error) {
            console.log(error);
        } else {
            console.log('success');
        }
    });
}
