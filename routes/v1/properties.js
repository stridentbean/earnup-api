const express = require('express');
const router = express.Router();

// utils
const validator = require('utils/validator');
const safeHandler = require('utils/safeHandler');

// logic layer
const propertiesLogic = require('logic/properties');

// Validate an incoming request for properties.
// TODO make this a get request that uses querystrings instead of a POST request.
// It would be more RESTful and likely more accepted by developers.
router.post('/', safeHandler(async (req, res, next) => {

    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const distance = req.body.distance;
    const query = req.body.query;
  
    try {

        if (latitude) {
            validator.isDecimal(latitude);
        }

        if (longitude) {
            validator.isDecimal(longitude);
        }

        if (distance) {
            validator.isPositiveInteger(distance);
        }

        if (query) {
            validator.isAlphanumericAndSpaces(query);
        }

    } catch (error) {
      return next(error);
    }

    propertyList = await propertiesLogic.getProperties(latitude, longitude, distance, query);

    res.json(propertyList);
  }));

  module.exports = router;