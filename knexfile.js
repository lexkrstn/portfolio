const merge = require('lodash/merge');
const defaultConfig = require('./src/server/default.config.json');
const customConfig = require('./local/config.json');

const config = merge(defaultConfig, customConfig);

const commonEnvConfig = {
  client: 'postgresql',
  connection: config.db,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'migrations',
  },
};

module.exports = {
  development: commonEnvConfig,
  staging: commonEnvConfig,
  production: commonEnvConfig,
};
