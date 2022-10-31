# Portfolio

> My personal web page with a short bio, professional skills, services
> I provide and a portfolio section with some examples of work.

Technology stack:
- Browser: TypeScript, React / Redux, Styled Components, RxJS
- Server: TypeScript, NestJS, MongoDB

## Deploy on a local server (as a docker container)

1. Install Docker
2. Clone the repo:
   ```sh
   git clone git@github.com:lexkrstn/wallbase.git
   cd ./wallbase
   ```
3. Create self-signed certificates:
   ```sh
   chmod +x ./scripts/gencert.sh
   ./scripts/gencert.sh
   ```
4. Startup the app:
   ```sh
   docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
   ```
5. Startup the building:
   ```sh
   npm run watch
   ```

## Deploy on a local server (as standalone app)

Prerequisites
- [NodeJS LTS](https://nodejs.dev)
- [MongoDB 5+](https://docs.mongodb.com/manual/installation/)

```bash
# 1. Get a copy of the project from git
git clone git@github.com:lexkrstn/portfolio.git
cd ./portfolio

# 2. Install NPM dependencies
npm i

# 3. Build the project
npm run build

# 4. Configure the server (optional, see the options below)

# 5. Install MongoDB migration tool and run migrations
npm i -g migrate-mongo
migrate-mongo up

# 6. Start the server
npm run start:prod
```

## Deploy on AWS

1. Install Docker
2. Copy `docker-compose.yml`, `.env`, `scripts/gencert.sh`, and `nginx.conf`
   into the EC2 instance user's home folder.
3. Comment out SSL server configs in nginx.conf
4. Get certificates:
   ```sh
   docker compose up -d nginx
   docker compose up --profile certbot
   docker compose down
   ```
5. Startup:
   ```sh
   docker compose up -d
   ```

### Configuration

The preferred way to configure the server is by setting environment variables:
- `DB_HOST` *default* = **localhost**
- `DB_PORT` *default* = **27017**
- `DB_USER` *default* = *empty (not enabled access control)*
- `DB_PASSWORD` *default* = *empty (not enabled access control)*
- `DB_NAME` *default* = **portfolio** or **portfolio_test**
- `API_HOST` *default* = **0.0.0.0**
- `API_PORT` *default* = **3000**
- `API_INTERNAL_URL` *default* = **https://localhost:3000**
- `API_EXTERNAL_URL` *default* = **https://localhost:3000**
- `MAIL_USER` (gmail) *default* = *not set*
- `MAIL_PASSWORD` (gmail) *default* = *not set*
- `SSR_HOST` *default* = **0.0.0.0**
- `SSR_PORT` *default* = **8080**
- `SSL_KEY` *default* = *empty (do not use https)*
- `SSL_CERT` *default* = *empty (do not use https)*
- `STATIC_URL` *default* = *empty (load static files from query path)*

An alternative way is to create a file named `.env` in the root of the project
and put all the environment variables there (one per line).
