const path = require('path');
const webpack = require('webpack');
const nodeFlag = require('node-flag');
const nodeExternals = require('webpack-node-externals');

const DEBUG = nodeFlag.get('mode') !== 'production';

const config = {
  target: 'node',
  entry: './src/ssr/server.ts',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'ssr.js',
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [],
};

if (DEBUG) {
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
        entryOnly: false,
      }),
    ],
  };
} else {
  module.exports = {
    ...config,
    mode: 'production',
    devtool: 'source-map',
    plugins: [
      ...config.plugins,
      new webpack.IgnorePlugin({
        resourceRegExp: /^source-map-support\/register|redux\-devtools\-extension|remote-redux-devtools$/
      }),
    ],
  };
}
