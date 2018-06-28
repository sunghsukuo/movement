let resources = require('./../../resources/model');

let model = resources.pi.sensors.ultrasonic;
let pluginName = resources.pi.sensors.ultrasonic.name;
let localParams = {simulate: false, frequency: 150};
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

    triggerGpio.writeSync(0);
    triggerGpio.writeSync(1);
    setTimeout(function() {
        let timeout = 0;

        triggerGpio.writeSync(0);
        let begin = process.hrtime();
        // detect echo pull-high
        let i = 0;
        while ((echoGpio.readSync() == 0) && (timeout < resources.pi.sensors.ultrasonic.timeout)) {
            //i++;
            let diff = process.hrtime(begin);
            timeout = (diff[0] * 1e9 + diff[1]) / 1000; // unit is us
        }
        //console.log(timeout, i);
        var start = process.hrtime();
        if (timeout < resources.pi.sensors.ultrasonic.timeout) {
            while (echoGpio.readSync() == 1) {
            }
            let diff = process.hrtime(start);
            //model.value = (diff[0] + diff[1] * 1e-9) * 17150;
            let value = (diff[0] * 1e6 + diff[1] * 1e-3) / 29 / 2;
            model.value = Math.round(value * 100) / 100;

            showValue();
        } else {
            console.info('%s get distance timeout!', pluginName);
        }
        
    }, 0.01); // 10us
}

function simulate() {
    interval = setInterval(function () {
        model.value = Math.floor((Math.random() * 10) + 1);
        showValue();
    }, localParams.frequency);
    console.info("Simulated %s started!", pluginName);
}

function showValue() {
    //console.info(model.value >= 5 ? 'not yet touched!' : 'touched!');
    //console.info(model.value);
}


/*exports.start(localParams);

setTimeout(function () {
    exports.stop();
}, 10000);
*/