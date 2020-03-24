// Establish a connection to the mysql database on boot
const mysql = require('mysql');
let connected = false;

// TODO pull out credentials into docker compose files
// TODO create one connections file for multiple datasources
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3308,
    user: 'root',
    password: 'helloworld',
    database: 'testapp',
});

connection.connect((err) => {
    if (err) {
        throw err;
    }

    connected = true;
});

// TODO call on api shutdown
function disconnect() {
    connection.end((err) => {

        if (!err) {
            connected = false;
        } else {
            // TODO logg err
        }
        
        // The connection is terminated gracefully
        // Ensures all remaining queries are executed
        // Then sends a quit packet to the MySQL server.
    });
}

/**
 * Return a list of properties inside a square boundry.
 * @param {*} northBound 
 * @param {*} southBound 
 * @param {*} eastBound 
 * @param {*} westBound 
 * @param {*} rowLimit 
 */
async function getPropertiesByBounds(northBound, southBound, eastBound, westBound, rowLimit) {

    /**
     * MySql does not understand that latitudes Sort latitude and longitude by the highest and lowest. 
     *  
     **/ 
    let highestLat = northBound;

    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM Properties 
            WHERE latitude BETWEEN ${southBound.lat} AND ${northBound.lat} 
            AND longitude BETWEEN ${westBound.lon} AND ${eastBound.lon}
            LIMIT ${rowLimit}`;

        // execute the insert statment
        connection.query(sql, function (err, results){
            if (!err) {
                resolve(results);
            } else {
                reject(err);
            }
        });
    });


}

// TODO add to healthcheck route
function isConnected() {
    return active;
}

module.exports = {
    disconnect,
    getPropertiesByBounds,
};