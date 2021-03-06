let resources = require('./resources.json');

// Implement the proxy of actuators which will be used in plugin to detect the value changed
const handler = {};
resources.pi.actuators.rgbLEDs[1] = new Proxy(resources.pi.actuators.rgbLEDs[1], handler);
resources.pi.actuators.rgbLEDs[1].valueHandler = handler;

module.exports = resources;
