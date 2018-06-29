let express = require('express'),
    actuatorsRoutes = require('./../routes/actuators'),
    sensorsRoutes = require('./../routes/sensors'),
    resources = require('./../resources/model'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    converter = require('./../middleware/converter');

let app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/pi/actuators', actuatorsRoutes);
app.use('/pi/sensors', sensorsRoutes);

app.get('/pi', function (req, res) {
    res.send('This is the WoT-Pi for movement training.');
});

// For representation design
app.use(converter());
module.exports = app;
