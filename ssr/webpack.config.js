const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, options) => {
  return {
    mode: options.mode,
    devtool: 'source-map',
    target: 'node',
    entry: './ssr/src/main.ts',
    output: {
      libraryTarget: 'commonjs2',
      filename: 'ssr.js',
      path: path.join(__dirname, '..', 'dist'),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.tsx', '.ts'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    // Do not bundle node_modules in debug builds
    externals: [nodeExternals({
      allowlist: ['three/examples/jsm/loaders/SVGLoader'],
    })],
    plugins: [
      new webpack.NormalModuleReplacementPlugin(
        /^(source-map-support\/register|redux-devtools-extension|remote-redux-devtools)$/,
        'lodash/noop',
      ),
    ],
  };
};
