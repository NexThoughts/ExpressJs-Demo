var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
        name: String,
        email: String,
        age: Number
    }),
    Users = mongoose.model('Users', UserSchema);

/* GET home page. */

router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/users', function (req, res) {
    Users.find({}, function (err, docs) {
        res.render('users/index', {users: docs});
    });
});


router.get("/users/new", function (req, res) {
    Users.find({}, function (err, docs) {
        res.render('users/new')
    });
});

//save
router.post("/users", function (req, res) {
    var b = req.body;
    new Users({
        name: b.name,
        email: b.email,
        age: b.age
    }).save(function (err, user) {
            if (err) res.json(err);
            res.redirect("/users/" + user._id)
        });
});

router.param('name', function (req, res, next, name) {
    Users.find({name: name}, function (err, docs) {
        req.user = docs[0];
        next();
    });
});
//show
router.get("/users/:id", function (req, res) {
    Users.find({_id: req.params.id}, function (err, docs) {
        if (docs) {
            var user = docs[0];
            res.render('users/show', {user: user});
        } else {
            res.render('error', {message: 'Array index out of bound.'});
        }
    });
});
module.exports = router;

