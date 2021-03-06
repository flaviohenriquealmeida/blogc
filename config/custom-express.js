const express = require('express');
const app = express();
require('marko/node-require').install();
require('marko/express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(cookieParser());

require('../app')(app);

app.use('*', (req, res) => res.status(404).marko(require("../app/base/views/errors/404.marko")));
// app.use((error,req, res, next) => res.status(500).marko("../app/base/errors/500.marko"));

module.exports = app;