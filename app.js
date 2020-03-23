require('module-alias/register');
require('module-alias').addPath('.');
const express = require('express');
const bodyParser = require('body-parser');

const camelCaseReqMiddleware = require('middlewares/camelCaseRequest.js').camelCaseRequest;
const errorHandleMiddleware = require('middlewares/errorHandling.js');

const ping = require('routes/ping.js');
const app = express();

app.use(camelCaseReqMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/ping', ping);

app.use(errorHandleMiddleware);
app.use((req, res) => {
    res.status(404).json(); // eslint-disable-line no-magic-numbers
});

module.exports = app;