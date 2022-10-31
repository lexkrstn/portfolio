#!/bin/sh

mkdir -p ./certbot/conf/live/lexkrstn.com
openssl genrsa > ./certbot/conf/live/lexkrstn.com/privkey.pem
openssl req -new -x509 \
    -key ./certbot/conf/live/lexkrstn.com/privkey.pem \
    > ./certbot/conf/live/lexkrstn.com/fullchain.pem
