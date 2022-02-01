FROM node:16-alpine
WORKDIR /opt/portfolio
COPY . .
RUN npm i && \
    npm run build:prod

FROM node:16-alpine
WORKDIR /opt/portfolio
COPY . .
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/main' >> /etc/apk/repositories && \
    echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/community' >> /etc/apk/repositories && \
    apk add --no-cache mongodb mongodb-tools yaml-cpp=0.6.2-r2 && \
    mkdir -p /data/db/ && \
    chown root /data/db && \
    chmod +x ./deploy/entrypoint.sh && \
    npm i --production && \
    npm i -g migrate-mongo
COPY --from=0 /opt/portfolio/dist ./dist
COPY --from=0 /opt/portfolio/public/js ./public/js

EXPOSE 8080 3000

CMD ./deploy/entrypoint.sh
