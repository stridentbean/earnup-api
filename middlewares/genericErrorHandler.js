const ValidationError = require('models/errors').ValidationError;

const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

function handleError(error, req, res) {

    var message = error.message || '';

    if (error instanceof ValidationError) {
        res.status(BAD_REQUEST).json(message);
    } else {
        res.status(INTERNAL_SERVER_ERROR).json(message);
    }

}

module.exports = handleError;