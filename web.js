// Module dependencies
var express = require("express");
var logfmt = require("logfmt");
var app = express();
var site = require('./site');

// Config
app.set('views', __dirname + '/src/views');
app.set('view engine', 'hbs');
app.use(logfmt.requestLogger());

// General
app.get('/', function(req, res) {
    res.render('index', {title: 'Ayu\'s Blog'});
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
        console.log("Listening on " + port);
});
