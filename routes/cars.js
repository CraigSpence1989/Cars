'use strict'

const db = require('../config/database')
var express = require('express');
var router = express.Router();
var carsCollection = db.get('cars')

/* GET home page. */
router.get('/', function(req, res, next) {

    carsCollection.find({},
        function(err, foundCars) {
            console.log(foundCars);
            res.render('cars/index', {
                cars: foundCars
            })
        });
});


router.get('/new', function(req, res) {
    res.render('cars/new');
});

router.get('/:id', function(req, res) {
    //  console.log("id = ", req.params.id)

    carsCollection.findOne({
        _id: req.params.id
    }, function(err, car) {
        if (err) throw err
        res.render('cars/view', {
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
