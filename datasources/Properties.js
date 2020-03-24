// Establish a connection to the mysql database on boot
const mysql = require('mysql');
let connected = false;

// TODO create one connections file for multiple datasources
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT, // use 3308 when not in docker
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
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

// Get a set of properties from the mysql database given a set of query inputs. 
async function getPropertiesByBounds(northBound, southBound, eastBound, westBound, rowLimit) {

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
    isConnected,
};