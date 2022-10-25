FROM node:16-alpine
FROM node:current-alpine
WORKDIR /opt/portfolio

COPY . .

RUN apk --no-cache add curl && \
    npm i -g migrate-mongo && \
    npm i && \
    npm run build && \
    npm prune --production

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 80 3000

CMD ./scripts/entrypoint.sh
