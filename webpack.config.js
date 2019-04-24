// Required packages
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Environment
const mode = process.env.NODE_ENV || 'development';

const isDev = mode === 'development';
const isProd = mode === 'production';

// Webpack configuration
const config = {
  entry: './src/index.jsx',
  mode,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: isDev ? 'app.js' : 'app.[hash].js',
  },
  devServer: {
    stats: {
      children: false,
      modules: false,
      warnings: true,
    },
  },
  module: {
    rules: [],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.scss'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? 'styles.css' : 'styles.[hash].css',
    }),
  ],
};

// Javascript
config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [
    'babel-loader',
  ],
});

// Styles
config.module.rules.push({
  test: /\.(scss)$/,
  use: [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
    'sass-loader',
  ],
});

// Optimizations for production
if (isProd) {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  );
}

module.exports = config;
