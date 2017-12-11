/**
 * Example backend server to allow the demo to work, these would actually be your real life
 * applications and services.
 *
 * The example backend response that contains the compoxure fragment config is in static/backend.html.
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const morgan = require('morgan');
const serveStatic = require('serve-static');

const app = express();
app.use(cookieParser());
app.use(morgan('combined'));
app.disable('x-powered-by');
app.use(morgan('combined'));
app.use(serveStatic('static', {'index': ['index.html', 'index.htm']}));

app.listen(7001, function() {
  console.log('Example backend server on http://localhost:7001');
});
