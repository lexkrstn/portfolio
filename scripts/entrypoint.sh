#!/bin/sh

echo "Running migrations..."
migrate-mongo up

echo "Starting node applications..."
node ./dist/api.js &
node ./dist/ssr.js &

# Wait for any process to exit
wait -n
