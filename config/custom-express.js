const express = require('express');
const app = express();
require('marko/node-require').install();
require('marko/express');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app);

module.exports = app;