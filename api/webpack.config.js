const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, options) => {
  return {
    mode: options.mode,
    devtool: 'source-map',
    // Tells webpack not to touch any built-in modules like fs or path
    target: 'node',
    entry: './api/src/main.ts',
    resolve: {
      alias: {
        // Although it's actually resolved by a babel plugin (see below) these
        // lines are required for eslint's plugin which relies on them.
        '~': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js', '.json', '.ts'],
    },
    output: {
      libraryTarget: 'commonjs2',
      filename: 'api.js',
      path: path.join(__dirname, '..', 'dist'),
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
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [],
    externals: [nodeExternals()],
    optimization: {
      // Mongoose doesn't work when minimization is on
      minimize: false,
    },
  };
};
