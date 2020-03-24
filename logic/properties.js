// dependencies
const geolib = require('geolocation-utils');

// constants
const NORTH_POLE = {lat: 90, lon: 0};
const SOUTH_POLE = {lat: -90, lon: 0};
const WEST_POLE = {lat: 0, lon: -180};
const EAST_POLE = {lat: 0, lon: 180};
const NORTH_IN_DEGREES = 0;
const SOUTH_IN_DEGREES = 180;
const EAST_IN_DEGREES = 90;
const WEST_IN_DEGREES = 270;

const DEFAULT_QUERY_LIMIT = 1000;
const DEFAULT_ROWS_RETURNED = 100;
const DEFAULT_DISTANCE_IN_METERES = 1600;

// datasource layer
const propertiesDatasource = require('datasources/properties');

// Compare two objects with nlpHit scores.
function nlpCompare(a, b) {
    if (a.nlpHit < b.nlpHit){
        return -1;
    }
    if (a.nlpHit > b.nlpHit){
        return 1;
    }
    return 0;
}

// Get a list of properties based on a set of query parameters.
async function getProperties(latitude, longitude, distance, query) {
    let propertyList = [];
    
    // if lat and long are suppied
    if (latitude && longitude) {

        // default distance in meters 
        distance = distance || DEFAULT_DISTANCE_IN_METERES;

        // calculate bounds
        const northBound = geolib.moveTo({lat: latitude, lon: longitude}, {distance, heading: NORTH_IN_DEGREES});
        const southBound = geolib.moveTo({lat: latitude, lon: longitude}, {distance, heading: SOUTH_IN_DEGREES});
        const eastBound = geolib.moveTo({lat: latitude, lon: longitude}, {distance, heading: EAST_IN_DEGREES});
        const westBound = geolib.moveTo({lat: latitude, lon: longitude}, {distance, heading: WEST_IN_DEGREES});
        
        propertyList = await propertiesDatasource.getPropertiesByBounds(northBound, southBound, eastBound, westBound, DEFAULT_QUERY_LIMIT);
    } else {

        // query random rows
        // TODO This is not really random. Fix database query if random is desired. 
        propertyList = await propertiesDatasource.getPropertiesByBounds(NORTH_POLE, SOUTH_POLE, EAST_POLE, WEST_POLE, DEFAULT_QUERY_LIMIT);
    }

    // TODO For each property, check distance to the given lat long. It may be slightly longer because we are using a bound approach
    // to querying properties instead of a distance query. This is likely okay because most users don't search based on a meter by 
    // meter distance. Also, roads are usually in grid and distance currently refers to distance as the crow flies, which isn't how
    // homans tend to travel.

    // parse rows in memory for query if it exists
    // #NLP-ROOKIE
    if (query) {

        // normalize to all lower case
        query = query.toLowerCase();

        // split into words
        const words = query.split(' ');

        for (let property of propertyList) {

            property.nlpHit = 0;

            for (let attribute in property) {

                for (let word of words) {

                    // if a word is found in a attribute
                    if (property[attribute] && property[attribute].toString().toLowerCase().indexOf(word) > -1) {
                        property.nlpHit++;
                    }
                }
            }
        }

        // sort based on nlp score, most accurate first
        propertyList.sort(nlpCompare).reverse();

        // TODO remove nlpHit if considered part of the secret sauce
    }

    // return top rows 
    return propertyList.slice(0, DEFAULT_ROWS_RETURNED);
}

module.exports = {
    getProperties,
}