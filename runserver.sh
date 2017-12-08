#!/bin/bash

set -e

sleep 10
docker kill $(docker ps -q) ||  docker rm $(docker ps -aq)
npm run migratedb
node run.js

exit 0
