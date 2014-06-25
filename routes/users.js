var express = require('express');
var router = express.Router();
//var mongoose = require("mongoose");
//var UserSchema = new mongoose.Schema({
//        name: String,
//        email: String,
//        age: Number
//    }),
//    Users = mongoose.model('Users', UserSchema);


/* GET users listing. */

router.get("/", function (req, res) {
    Users.find({}, function (err, docs) {
        res.render('users/index', {users: docs})
    });
});


router.get("/new", function (req, res) {
    Users.find({}, function (err, docs) {
        res.render('users/new')
    });
});

//save
router.post("/", function (req, res) {
    var b = req.body;
    new Users({
        name: b.name,
        email: b.email,
        age: b.age
    }).save(function (err, user) {
            if (err) res.json(err);
            res.redirect("/users/" + user.name)
        });
});

router.param('name', function (req, res, next, name) {
    Users.find({name: name}, function (err, docs) {
        req.user = docs[0];
        next();
    });
});
//show
router.get("/:user", function (req, res) {
    res.render('users/show', {user: req.user})
});
module.exports = router;
