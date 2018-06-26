let httpServer = require('./servers/http'),
    resources = require('./resources/model');

let server = httpServer.listen(resources.pi.port, function () {
    console.info('Your WoT pi is up and running on port %s', resources.pi.port);
});


