FROM node:16-alpine
WORKDIR /opt/portfolio
COPY . .
RUN npm i && \
    npm run build:prod

FROM node:16-alpine
WORKDIR /opt/portfolio
COPY . .
RUN npm i --production && \
    npm i -g migrate-mongo
COPY --from=0 /opt/portfolio/dist ./dist
COPY --from=0 /opt/portfolio/public/js ./public/js

EXPOSE 80 3000

CMD ./deploy/entrypoint.sh
