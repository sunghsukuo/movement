let router = require('express').Router();
let resources = require('./../resources/model');

router.route('/').get(function (req, res, next) {
    req.result = resources.pi.actuators;
    next();
});

router.route('/rgbLED').get(function (req, res, next) {
    req.result = resources.pi.rgbLED;
    next();
});

router.route('/rgbLED/:id').get(function (req, res, next) {
    res.send(req.params.id);

    //req.result = resources.pi.actuators.rgbLED[req.params.id];
    //next();
}).put(function(req, res, next) {
    let selectedLed = resources.pi.actuators.rgbLED[req.params.id];
    selectedLed.value = req.body.value;
    req.result = selectedLed;
    next();
});

module.exports = router;