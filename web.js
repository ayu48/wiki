// Module dependencies
var express = require("express")
    , logfmt = require("logfmt")
    , path = require('path')
    , fs = require('fs')
    , hbs = require('hbs');

var app = express();

// Config
app.set('views', __dirname + '/src/views');
app.set('view engine', 'hbs');
app.use(logfmt.requestLogger());
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/src/views/partials');

// DB
var db = require('./db.js');
db.connectMongoDB();

// dynamically include routes
fs.readdirSync('./src/controllers').forEach(function(file) {
    if (file.substr(-3) == '.js') {
        route = require('./src/controllers/' + file);
        route.controller(app);
    }
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
        console.log("Listening on " + port);
});
