const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const nodeFlag = require('node-flag');

const config = {
  // Tells webpack not to touch any built-in modules like fs or path
  target: 'node',
  entry: './src/api/main.ts',
  resolve: {
    alias: {
      // Although it's actually resolved by a babel plugin (see below) these
      // lines are required for eslint's plugin which relies on them.
      '~': path.resolve(__dirname, 'src/api'),
    }
  },
  output: {
    libraryTarget: 'commonjs2',
    filename: 'api.js',
    path: path.join(__dirname, 'dist'),
  },
  node: {
    // Enables __dirname constant for sources in bundle.
    // It'll always refer to the dist folder, nevertheless the original file
    // path.
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
  externals: [
    // Do not bundle node_modules
    nodeExternals(),
    // Do not bundle /local/config.json
    function(context, request, callback) {
      if (/local[\\\/config\.json]$/.test(request)) {
        return callback(null, 'commonjs ' + request);
      }
      callback();
    },
  ],
  plugins: []
};

if (nodeFlag.get('mode') !== 'production') {
  module.exports = {
    ...config,
    mode: 'development',
    devtool: 'source-map',
    plugins: [
      ...config.plugins,
      // Source map support for stack traces in node
      new webpack.BannerPlugin({
        // The banner as string, it will be wrapped in a comment
        banner: 'require("source-map-support").install();',
        // Prepend the text as it is, not wrapping it in a comment
        raw: true,
        // Adds the text to all generated files, which you might have multiple
        entryOnly: false
      })
    ]
  };
} else {
  module.exports = {
    ...config,
    mode: 'production',
    devtool: 'source-map'
  };
}
