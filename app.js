require('module-alias/register');
require('module-alias').addPath('.');
const express = require('express');
const bodyParser = require('body-parser');

const camelCaseReqMiddleware = require('middlewares/camelCaseRequest').camelCaseRequest;
const genericErrorHandlerMiddleware = require('middlewares/genericErrorHandler');

const properties = require('routes/v1/properties.js');
const ping = require('routes/ping.js');
const app = express();

// middlewares
app.use(camelCaseReqMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.use('/v1/properties', properties);
app.use('/ping', ping);

// error handling
app.use(genericErrorHandlerMiddleware);
app.use((req, res) => {
    res.status(404).json();
});

module.exports = app;