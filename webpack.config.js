const apiConfig = require('./api/webpack.config');
const ssrConfig = require('./ssr/webpack.config');
const browserConfig = require('./browser/webpack.config');

module.exports = [apiConfig, ssrConfig, browserConfig];
