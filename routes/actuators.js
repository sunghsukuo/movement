let router = require('express').Router();
let resources = require('./../resources/model');

router.route('/').get(function (req, res, next) {
    req.result = resources.pi.actuators;
    next();
});

router.route('/rgbLEDs').get(function (req, res, next) {
    //res.send(resources.pi.actuators.rgbLEDs);
    req.result = resources.pi.actuators.rgbLEDs;
    next();
});

router.route('/rgbLEDs/:id').get(function (req, res, next) {
    //res.send(resources.pi.actuators.rgbLEDs[req.params.id]);

    req.result = resources.pi.actuators.rgbLEDs[req.params.id];
    next();

}).put(function(req, res, next) {
    let selectedLed = resources.pi.actuators.rgbLEDs[req.params.id];
    selectedLed.value = req.body

    //res.send(selectedLed);

    req.result = selectedLed;
    next();
});

module.exports = router;