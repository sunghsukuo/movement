let resources = require('./resources.json');


const handler = {};
resources.pi.actuators.rgbLEDs[1] = new Proxy(resources.pi.actuators.rgbLEDs[1], handler);
resources.pi.actuators.rgbLEDs[1].handler = handler;

module.exports = resources;
