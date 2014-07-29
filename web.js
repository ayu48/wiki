// Module dependencies
var express = require("express")
    , bodyParser = require("body-parser")
    , methodOverride = require("method-override")
    , logfmt = require("logfmt")
    , path = require('path')
    , fs = require('fs')
    , hbs = require('hbs')
    , session = require('express-session')
    , passport = require('passport');

var app = express();

// Config
app.set('views', __dirname + '/src/views');
app.set('view engine', 'hbs');
app.use(logfmt.requestLogger());
app.use(bodyParser());
//FIXME
app.use(session({secret: 'secret key'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/src/views/partials');
require('./src/helpers.js');

// DB
var db = require('./db.js');
db.connectMongoDB();

// Bootstrap Models
var models_path = __dirname + '/src/domain';
fs.readdirSync(models_path).forEach(function (file) {
    if (/\.js$/.test(file)) require(models_path + '/' + file);
});

// Routes
require('./routes.js')(app);

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
        console.log("Listening on " + port);
});
