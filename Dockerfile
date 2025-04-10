FROM node:current-alpine
WORKDIR /opt/portfolio

COPY . .

RUN npm ci && \
    npm run build && \
    npm prune --production && \
    npm i -g migrate-mongo

EXPOSE 80 8080

CMD ./scripts/entrypoint.sh
