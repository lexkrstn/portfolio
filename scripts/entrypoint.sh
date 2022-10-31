#!/bin/sh

if [[ -z "${STATIC_DIR}" ]]; then
  echo "STATIC_DIR env is not set, skip copying static files"
else
  echo "Copying static files into ${STATIC_DIR}..."
  cp -r ./public/* $STATIC_DIR
fi

echo "Running migrations..."
migrate-mongo up

echo "Starting node applications..."

if [ "$NODE_ENV" != "development" ]; then
  node ./dist/api.js &
  node ./dist/ssr.js &
  # Wait for any process to exit
  wait -n
else
  npm start
fi
