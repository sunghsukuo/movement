let router = require('express').Router();
let resources = require('./../resources/model');

router.route('/').get(function (req, res, next) {
    //res.send(resources.pi.sensors);
    req.result = resources.pi.sensors;
    next();
});

router.route('/ultrasonic').get(function (req, res, next) {
    res.send(resources.pi.sensors.ultrasonic);
    //req.result = resources.pi.sensors.ultrasonic;
    //next();
});

module.exports = router;