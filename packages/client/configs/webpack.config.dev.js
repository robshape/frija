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

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const config = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/api': {
        pathRewrite: {
          '^/api': '', // RegExp.
        },
        target: 'http://localhost:3000',
      },
    },
  },

  devtool: 'eval-cheap-module-source-map',

  mode: 'development',

  module: {
    rules: [
      {
        include: path.resolve(process.cwd(), './src/'),
        test: /\.(js|jsx)$/,
        use: [
          {
            // loader: 'babel-loader',
            // options: {
            //   cacheCompression: false,
            //   cacheDirectory: true,
            //   configFile: './configs/babel.config.js',
            // },
            loader: 'esbuild-loader',
            options: {
              loader: 'jsx',
              target: 'es2015',
            },
          },
        ],
      },
      {
        include: path.resolve(process.cwd(), './src/'),
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
    removeEmptyChunks: false,
    splitChunks: false,
  },

  output: {
    pathinfo: false,
  },

  plugins: [
    new HtmlWebpackPlugin({
      scriptLoading: 'defer',
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.js', '.jsx'],
  },
};

module.exports = config;
