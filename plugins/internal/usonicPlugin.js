let resources = require('./../../resources/model');

let model = resources.pi.sensors.ultrasonic;
let pluginName = resources.pi.sensors.ultrasonic.name;
let localParams = {simulate: false, frequency: 2000};
let interval;
let echoGpio, triggerGpio;

exports.start = function(params) {
    localParams = params;
    if (localParams.simulate) {
        simulate();
    } else {
        connectHardware();
    }
}

exports.stop = function() {
    clearInterval(interval);
    if (!localParams.simulate) {
        echoGpio.unexport();
        triggerGpio.unexport();
    }
    console.info('% plugin stopped!', pluginName);
}

function connectHardware() {
    let Gpio = require('onoff').Gpio;

    echoGpio = new Gpio(model.echoGpio, 'in', 'both');
    triggerGpio = new Gpio(model.triggerGpio, 'out');

    interval = setInterval(getDistance, localParams.frequency);
    console.info('Hardware %s started!', pluginName);
}

function getDistance() {
    model.value = 10;
    showValue();
}

function simulate() {
    interval = setInterval(function () {
        model.value = Math.floor((Math.random() * 10) + 1);
        showValue();
    }, localParams.frequency);
    console.info("Simulated %s started!", pluginName);
}

function showValue() {
    console.info(model.value >= 5 ? 'not yet touched!' : 'touched!');
}

exports.start(localParams);