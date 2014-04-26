// Module dependencies
var express = require("express")
    , logfmt = require("logfmt")
    , path = require('path');

var app = express();

// Config
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(logfmt.requestLogger());
app.use(express.static(path.join(__dirname, 'public')));

// General
app.get('/', function(req, res) {
    res.render('index', {title: 'Ayu\'s Blog'});
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
        console.log("Listening on " + port);
});
