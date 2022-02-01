#!/bin/sh

if ! pgrep -x "mongod" > /dev/null; then
    mongod --fork --logpath /var/log/mongodb/mongod.log
fi
migrate-mongo up

node ./dist/api.js &
node ./dist/ssr.js &

# Wait for any process to exit
wait -n
