Earn Up Coding challenge.

Prerequisite Software
1. Docker (https://www.docker.com/products/docker-desktop)
1. MySql Workbench (https://www.mysql.com/products/workbench/)

Get the git repositories
1. `git clone https://github.com/stridentbean/earnup-db/`
1. `git clone https://github.com/stridentbean/earnup-api`

Database Setup and Importing
1. Navigate to the earnup-api
1. Run `docker-compose up -d`. This will attempt to start the database and api. The api will fail because the database is not initialized yet 
1. Navigate to the earnup db
1. Run `npm install`
1. Open MySql Workbench and connect to the database
1. Execute file `permissions_fix.sql`
1. Execute file `create_tables.sql`
1. Run `node import.js`. This will take about five minutes to complete. You will have to escape the promopt when it is finished

Running the api
1. Navigate to the earnup-api
1. Run `docker-compose up -d`. This will attempt to start the database and api. The database is already running and will not be recreated. The api is not running and should now start and connect. 
1. Curl away, ex `curl -X POST localhost:3000/v1/properties -H "Content-Type: application/json" -d '{"latitude": 40.7306, "longitude": -73.9352, "distance": 1000, "query": "clean nice grocery"}'`
1. Feel free to pipe into JQ for better viewing `| jq .`