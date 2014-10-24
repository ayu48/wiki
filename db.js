var mongoose = require('mongoose');

exports.connectMongoDB = function() {
    mongoose.connect(process.env.MONGOHQ_URI, function(error) {
        if (error) {
            console.log(error);
        } else {
            console.log('success');
        }
    });
};
