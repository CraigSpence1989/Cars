'use strict'

const db = require('../config/database')
var express = require('express');
var router = express.Router();
var carsCollection = db.get('cars')

router.delete('/:id', function(req, res) {

    //res.send('cars/new' + req.body._id);
    carsCollection.remove({
        _id: req.params.id
    }, function(err, result) {

        if (err) throw err;
        if (result.result.n == 1) {
            res.redirect("/cars")
        } else {
            console.log("Error deleting car")
        }

    })
});

router.put('/:id', function(req, res) {

    carsCollection.update({
        _id: req.params.id
    }, {
        $set: req.body
    }, function(err, result) {
        if (err) throw err;
        res.redirect("/cars")
    })
});


/* GET home page. */
router.get('/', function(req, res, next) {
    carsCollection.find({},
        function(err, foundCars) {
            res.render('cars/index', {
                cars: foundCars
            })
        });
});




router.get('/new', function(req, res) {
    res.render('cars/new');
});


router.get('/:id', function(req, res) {
    carsCollection.findOne({
        _id: req.params.id
    }, function(err, car) {
        if (err) throw err
        res.render('cars/view', {
            cars: car
        });
    });
});

router.get('/:id/Edit', function(req, res) {
    carsCollection.findOne({
        _id: req.params.id
    }, function(err, car) {
        if (err) throw err
        res.render('cars/Edit', {
            cars: car
        });
    });
});

router.post('/', function(req, res) {
    var carsCollection = db.get('cars')
    carsCollection.insert(req.body, function(err, savedCar) {

        if (err) throw err
        res.redirect("/cars")
    })
});

module.exports = router;
