// Establish a connection to the mysql database on boot
const mysql = require('mysql');
let connected = false;

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

function isConnected() {
    return active;
}

module.exports = {
    disconnect,
};