let resources = require('./../../resources/model'),
    utils = require('./../../utils/utils');

let model = resources.pi.actuators.rgbLEDs['1'];
let pluginName = model.name;
let localParams = {'simulate': false, 'frequency': 2000};
let interval;
let ledRed, ledGreen, ledBlue;

exports.start = function (params) {
    localParams = params;
    observe(model);
  
    if (localParams.simulate) {
      simulate();
    } else {
      connectHardware();
    }
  };

  exports.stop = function () {
    if (localParams.simulate) {
      clearInterval(interval);
    } else {
        ledRed.unexport();
        ledGreen.unexport();
        ledBlue.unexport();
    }
    console.info('%s plugin stopped!', pluginName);
  };

  function observe(what) {
    //Object.observe(what, function (changes) {
    //  console.info('Change detected by plugin for %s...', pluginName);
    //  changeRGBColor(model.value); //#B
    //});
  };


  function changeRGBColor(value) {
    if (!localParams.simulate) {
        ledRed.pwmWrite(model.value.r);
        ledGreen.pwmWrite(model.value.g);
        ledBlue.pwmWrite(model.value.b);
    }
  };

  function connectHardware() {
    var Gpio = require('pigpio').Gpio;

    ledRed = new Gpio(model.gpio.r, {mode: Gpio.OUTPUT});
    ledGreen = new Gpio(model.gpio.g, {mode: Gpio.OUTPUT});
    ledBlue = new Gpio(model.gpio.b, {mode: Gpio.OUTPUT});

    //RESET RGB LED
    ledRed.digitalWrite(0);
    ledGreen.digitalWrite(0);
    ledBlue.digitalWrite(0);

    console.info('Hardware %s actuator started!', pluginName);
  };

  function simulate() {
    interval = setInterval(function () {
      // Switch value on a regular basis
      console.log(utils.randomInt(0,255));
      //model.value = {"r":utils.randomInt(0,255), "g":utils.randomInt(0,255), "b":utils.randomInt(0,255)};
    }, localParams.frequency);
    console.info('Simulated %s actuator started!', pluginName);
  };