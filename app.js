var express = require('express'),
    http = require("http"),
    path = require('path'),
    mongoose = require("mongoose");
var bodyParser = require('body-parser')

var app = express();

var routes = require('./routes/index');
var users = require('./routes/users');

//app.Configure(function () {
app.set('port', process.env.PORT | 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(express.methodOverride());
//app.use(app.router);
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use('/', routes);
//app.use('/users', users);
//});



mongoose.connect("mongodb://localhost/express-sample");
//
//var UserSchema = new mongoose.Schema({
//        name: String,
//        email: String,
//        age: Number
//    }),
//    Users = mongoose.model('Users', UserSchema);

module.exports = app;