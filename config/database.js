'use strict'

const monk = require('monk');

const db = monk('localhost:27017/cars-development')

module.exports = db
