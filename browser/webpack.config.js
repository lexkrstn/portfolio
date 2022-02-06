const ThreeMinifierPlugin = require("@yushijinhun/three-minifier-webpack");
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

dotenv.config();

const threeMinifier = new ThreeMinifierPlugin();

module.exports = (env, options) => {
  let plugins = [];

  const definitions = {
    'process.env.WEBPACK_DEV_SERVER': env.WEBPACK_SERVE ? 1 : 0,
  };

  if (env.WEBPACK_SERVE) {
    plugins = [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'ssr/views/index.pug',
        templateParameters: {
          title: 'Portfolio',
          initialState: {},
          markup: '',
          serve: true,
          config: {
            api: {
              internalUrl: 'http://localhost:3000',
              externalUrl: 'http://localhost:3000',
            },
          },
        },
      }),
    ];
  } else {
    plugins = [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: path.join(__dirname, 'reports', 'bundle-size.html'),
      }),
    ];
  }

  const config = {
    entry: {
      'app': './browser/src/index.tsx',
    },
    devServer: {
      contentBase: path.join(__dirname, '..', 'public'),
      compress: true,
      port: 8080,
      disableHostCheck: false,
      historyApiFallback: true,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.tsx', '.ts'],
    },
    output: {
      filename: '[name].bundle.js',
      path: path.join(__dirname, '..', 'public', 'js'),
    },
    optimization: {
      minimize: options.mode === 'production',
      usedExports: options.mode === 'production',
      minimizer: [ new TerserPlugin() ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/].*\.jsx?$/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        // File loader for supporting images, for example, in CSS files.
        {
          test: /\.(jpg|png|gif)$/,
          use: [{
            loader: 'url-loader',
            options: {
              name: '[name]-[hash].[ext]',
              limit: 4096,
              outputPath: '../images/generated/',
            },
          }],
        },
        // File loader for supporting fonts, for example, in CSS files.
        {
          test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
          use: [{
            loader: 'url-loader',
            options: {
              name: '[name]-[hash].[ext]',
              limit: 4096,
              outputPath: '../fonts/',
            }
          }],
        },
        // Required for loading templates by HtmlWebpackPlugin
        {
          test: /\.pug$/,
          use: 'pug-loader',
        },
      ],
    },
    plugins,
  };

  if (options.mode === 'production') {
    return {
      ...config,
      mode: 'production',
      devtool: 'source-map',
      resolve: {
        ...config.resolve,
        plugins: [
          threeMinifier.resolver,
        ],
      },
      plugins: [
        ...config.plugins,
        threeMinifier,
        new webpack.DefinePlugin({
          ...definitions,
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.NormalModuleReplacementPlugin(
          /^(source-map-support\/register|redux-devtools-extension|remote-redux-devtools)$/,
          'lodash/noop',
        ),
      ],
    };
  }

  return {
    ...config,
    mode: 'development',
    devtool: 'source-map',
    plugins: [
      ...config.plugins,
      new webpack.DefinePlugin({
        ...definitions,
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ],
  };
};
