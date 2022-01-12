const dotenv = require('dotenv');

dotenv.config();

const TEST = process.env.NODE_ENV === 'test';
const defaultPort = 27017;
const host = process.env.DATABASE_HOST || 'localhost';
const port = parseInt(process.env.DATABASE_PORT, 10) || defaultPort;
const user = process.env.DATABASE_USER || '';
const password = process.env.DATABASE_PASSWORD || '';
const userPassword = user && password ? `${user}:${password}@` : '';
const portPostfix = port !== defaultPort ? `:${port}` : '';
const url = `mongodb://${userPassword}${host}${portPostfix}`;
const databaseName = process.env.DATABASE_NAME || (TEST ? 'portfolio_test' : 'portfolio');

const config = {
  mongodb: {
    url,
    databaseName,

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    }
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: 'migrations',

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'changelog',

  // The file extension to create migrations and search for in migration dir
  migrationFileExtension: '.js',

  // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determin
  // if the file should be run.  Requires that scripts are coded to be run multiple times.
  useFileHash: false
};

// Return the config as a promise
module.exports = config;
