const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

dotenv.config();

const envVarsImporting = ['API_URL', 'HTTPS', 'PORT', 'DOMAIN'];
const definitions = {};
for (const name of envVarsImporting) {
  definitions[`process.env.${name}`] = JSON.stringify(process.env[name]);
}

module.exports = (env, options) => {
  let plugins = [];
  if (env.WEBPACK_SERVE) {
    plugins = [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'views/index.pug',
        templateParameters: {
          title: 'Portfolio',
          initialState: {},
          markup: '',
          serve: true,
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
      'app': './src/browser/index.tsx',
    },
    devServer: {
      contentBase: path.join(__dirname, 'public'),
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
      path: path.join(__dirname, 'public', 'js'),
    },
    optimization: {
      minimize: options.mode === 'production',
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
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            getCustomTransformers: () => ({
              before: options.mode !== 'production' ? [createStyledComponentsTransformer()] : [],
            }),
          },
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
          loader: 'pug-loader',
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
      plugins: [
        ...config.plugins,
        new webpack.DefinePlugin({
          ...definitions,
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.IgnorePlugin({
          resourceRegExp: /^source-map-support\/register|redux\-devtools\-extension|remote-redux-devtools$/
        }),
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
