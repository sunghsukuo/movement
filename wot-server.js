let httpServer = require('./servers/http'),
    resources = require('./resources/model');

// Internal Plugins
let usonicPlugin = require('./plugins/internal/usonicPlugin');

// Internal Plugins for sensors/actuators connected to the PI GPIOs
// If you test this with real sensors do not forget to set simulate to 'false'
//usonicPlugin.start({'simulate': false, 'frequency': 150});

let server = httpServer.listen(resources.pi.port, function () {
    console.info('Your WoT pi is up and running on port %s', resources.pi.port);
});


