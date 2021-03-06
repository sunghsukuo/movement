let resources = require('./../../resources/model'),
    utils = require('./../../utils/utils');

let model = resources.pi.actuators.rgbLEDs['1'];
let pluginName = model.name;
let localParams = {'simulate': false, 'frequency': 1000};
let interval;
let ledRed, ledGreen, ledBlue;

exports.start = function (params) {
    localParams = params;
    
    // add a new defined set function to the proxy handler of the model
    // any value modification of the model will be detected by this function
    // which can then change the physical rgb led.
    model.valueHandler.set = set;
      
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

   function set(target, key, value) {
    //console.log(target, key, value);
    if (key == 'value') {
        console.info('Change detected by plugin for %s...', pluginName);
        changeRGBColor(value);
        return Reflect.set(target, key, value)
    } else {
        throw new Error(`Can't set private "${ key }" property`);
    }
  }

  function changeRGBColor(value) {
    if (!localParams.simulate) {
        ledRed.pwmWrite(value.r);
        ledGreen.pwmWrite(value.g);
        ledBlue.pwmWrite(value.b);
    }
  };

  function connectHardware() {
    let Gpio = require('pigpio').Gpio;

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
      model.value = {"r":utils.randomInt(0,255), "g":utils.randomInt(0,255), "b":utils.randomInt(0,255)};

    }, localParams.frequency);
    console.info('Simulated %s actuator started!', pluginName);
  };

  //exports.start(localParams);