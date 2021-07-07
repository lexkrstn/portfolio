const apiConfig = require('./webpack.config.api');
const ssrConfig = require('./webpack.config.ssr');
const browserConfig = require('./webpack.config.browser');

module.exports = [/*apiConfig,*/ ssrConfig, browserConfig];
