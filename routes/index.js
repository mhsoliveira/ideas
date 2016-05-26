var express = require('express');
var router = express.Router();
var express = require('express');

// Mongoose import
var mongoose = require('mongoose');

var Json = require('../models/json.js')

// Mongoose connection to MongoDB
mongoose.connect('mongodb://localhost/ideas/data', function (error) {
    if (error) {
        console.log(error);
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET json data. */
router.get('/mapjson/:name', function (req, res) {
    if (req.params.name) {
        Json.findOne({ name: req.params.name },{}, function (err, docs) {
            res.json(docs);
        });
    }
});

// routes/index.js
/* GET layers json data. */
router.get('/maplayers', function (req, res) {
    Json.find({},{'name': 1}, function (err, docs) {
        res.json(docs);
        console.log(docs);
    });
});

/* GET Map page. */
router.get('/map', function(req,res) {
    var db = req.db;
    Json.find({},{}, function(e,docs){
        res.render('map', {
            "jmap" : docs,
            lat : 40.78854,
            lng : -73.96374
        });
    });
});

router.post('/newidea', function(req, res) {

var jsonn = new Json();

  jsonn.name = req.body.name;
  jsonn.type = req.body.type;
  jsonn.coordinates = req.body.coordinates.split(',').map(Number)

  // Save the beer and check for errors
  jsonn.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'You have got an idea!', data: jsonn });
  });
});

module.exports = router;
