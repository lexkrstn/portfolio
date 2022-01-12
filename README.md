# Portfolio

> My personal web page describing short bio, professional skills, services I
> provide and containing portfolio section with some examples of works.

Stack:
- Browser: TypeScript, React / Redux, Styled Components, RxJS
- Server: TypeScript, NestJS, MongoDB

## Deploy

Prerequisites
- [NodeJS LTS](https://nodejs.dev)
- [MongoDB 5+](https://docs.mongodb.com/manual/installation/)

### Steps to deploy to a local server
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

### Configuration

The preferred way to configure the server is by setting environment variables:
- `DATABASE_HOST` *default* = **localhost**
- `DATABASE_PORT` *default* = **27017**
- `DATABASE_USER` *default* = *empty (not enabled access control)*
- `DATABASE_PASSWORD` *default* = *empty (not enabled access control)*
- `DATABASE_NAME` *default* = **portfolio** or **portfolio_test**
- `API_PORT` *default* = **3000**
- `MAIL_USER` (gmail) *default* = *not set*
- `MAIL_PASSWORD` (gmail) *default* = *not set*

An alternative way is to create a file named `.env` in the root of the project
and put all the environment variables there (one per line).

## Commands cheatsheet

NPM:
- `npm run start` - starts SSR and API servers concurrently in debug mode
- `npm run start:prod` - starts SSR and API servers concurrently
- `npm run start:ssr` - starts SSR server in debug mode
- `npm run start:ssr:prod` - starts SSR server
- `npm run start:api` - starts API server in debug mode
- `npm run start:api:prod` - starts API server
- `npm run start:browser` - starts webpack dev server
- `npm run build` - builds SSR and API servers in debug mode
- `npm run build:prod` - builds SSR and API servers
- `npm run build:api` - builds API server in debug mode
- `npm run build:ssr` - builds SSR server in debug mode
- `npm run build:browser` - builds browser application in debug mode
- `npm run watch:api` - builds API server in JIT mode
- `npm run watch:ssr` - builds SSR server in JIT mode
- `npm run watch:browser` - builds browser application in JIT mode
- `npm run lint` - performs linting the browser, api and ssr code
- `npm run lint:api` - performs linting the API server code
- `npm run lint:ssr` - performs linting the SSR server code
- `npm run lint:browser` - performs linting the browser application code
- `npm run test` - performs testing the browser, api and ssr
- `npm run test:api` - performs testing the API server
- `npm run test:api:watch` - runs API server unit tests in watch mode
- `npm run test:api:e2e` - runs end-to-end API server tests
- `npm run test:api:coverage` - runs API tests and generates coverage report
- `npm run test:ssr` - performs unit testing of the SSR server
- `npm run test:browser` - performs testing the browser application
- `npm run test:browser:coverage` - runs tests and generates coverage report
- `npm run test:browser:watch` - runs browser app unit tests in watch mode

Misc:
- `migrate-mongo up` | `migrate-mongo down`
