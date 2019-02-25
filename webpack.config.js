/*

  Frija - The Swedish general election and Riksdag on the Ethereum blockchain.
  Copyright (C) 2018 Frija contributors.

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see https://www.gnu.org/licenses/.

*/

const DotenvPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const config = {
  devServer: {
    historyApiFallback: true,
    hot: true,
  },

  devtool: 'cheap-module-eval-source-map',

  entry: path.resolve(__dirname, './src/client/index.jsx'),

  mode: 'development',

  module: {
    rules: [
      {
        include: path.resolve(__dirname, './src/client/'),
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'cache-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        include: path.resolve(__dirname, './src/client/'),
        test: /\.scss$/,
        use: [
          {
            loader: 'cache-loader',
          },
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },

  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },

  output: {
    pathinfo: false,
  },

  plugins: [
    new DotenvPlugin(),
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  resolve: {
    extensions: [
      '.mjs', // Used by 'graphql' dependency.
      '.js',
      '.jsx',
    ],
    modules: [
      path.resolve(__dirname, './node_modules/'), // Used by 'webpack-dev-server' dependency.
      path.resolve(__dirname, './src/client/node_modules/'),
    ],
  },
};

module.exports = config;
