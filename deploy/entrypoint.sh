#!/bin/sh

migrate-mongo up

node ./dist/api.js &
node ./dist/ssr.js &

# Wait for any process to exit
wait -n
