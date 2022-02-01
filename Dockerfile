FROM node:16-alpine

# Any RUN, CMD, ADD, COPY, or ENTRYPOINT command will be executed here.
WORKDIR /opt/portfolio

# Install app dependencies.
# Note that, rather than copying the entire working directory, we are only
# copying the package.json file. This allows us to take advantage of cached
# Docker layers. bitJudo has a good explanation of this here:
# http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
COPY package*.json ./

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/main' >> /etc/apk/repositories && \
    echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/community' >> /etc/apk/repositories && \
    apk add --no-cache mongodb mongodb-tools openrc && \
    mkdir -p /data/db/ && \
    mkdir /run/openrc \
    touch /run/openrc/softlevel && \
    chown root /data/db && \
    rc-update add mongodb default

RUN npm i && \
    npm i -g migrate-mongo

# Bundle app source
COPY . .

EXPOSE 8080 3000

RUN npm run build:prod

ENTRYPOINT ["sh", "-c", "rc-status; rc-service mongodb start; migrate-mongo up"]

CMD ["npm run start:prod"]
