const express = require('express');
const app = express();
require('marko/node-require').install();
require('marko/express');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app);

app.use('*', (req, res) => res.status(404).marko(require("../app/base/views/errors/404.marko")));
// app.use((error,req, res, next) => res.status(500).marko("../app/base/errors/500.marko"));

module.exports = app;