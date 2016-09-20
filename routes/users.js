var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json({
        name: 'John Smith'
    });
});

module.exports = router;
