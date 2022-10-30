FROM node:current-alpine
WORKDIR /opt/portfolio

COPY . .

RUN npm i -g migrate-mongo && \
    npm i && \
    npm run build && \
    npm prune --production

EXPOSE 80 3000

CMD ./scripts/entrypoint.sh
