const { Router } = require('express');

const routes = Router();

require('./routes/facialRecognition')(routes);

module.exports = routes;
