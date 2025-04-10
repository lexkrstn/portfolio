#!/bin/sh

mkdir -p ./certbot/conf/live/akorostin.com
openssl genrsa > ./certbot/conf/live/akorostin.com/privkey.pem
openssl req -new -x509 \
    -key ./certbot/conf/live/akorostin.com/privkey.pem \
    > ./certbot/conf/live/akorostin.com/fullchain.pem
