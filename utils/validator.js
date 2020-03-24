const validator = require('validator');
const ValidationError = require('models/errors').ValidationError;

function isAlphanumericAndSpaces(string) {
    
    isDefined(string);
    
    if (!validator.matches(string, '^[a-zA-Z0-9\\s]*$')) {
        throw new ValidationError('Must include only alpha numeric characters and spaces.');
    }
}

function isBoolean(value) {
    if (value !== true && value !== false) {
        throw new ValidationError('Must be true or false.');
    }
}

function isDecimal(amount) {
    if (typeof amount === 'number') {
        return;
    }

    if (!validator.isDecimal(amount)) {
        throw new ValidationError('Must be decimal.');
    }
}

function isDefined(object) {
    if (object === undefined) {
        throw new ValidationError('Must define variable.');
    }
}

function isPositiveInteger(amount) {
    if (!validator.isInt(amount + '', {gt: 0})) {
      throw new ValidationError('Must be positive integer.');
    }
  }

module.exports = {
    isAlphanumericAndSpaces,
    isBoolean,
    isDecimal,
    isDefined,
    isPositiveInteger,
};