/*

  Frija - The Swedish general election system on the Ethereum blockchain.
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

module.exports = {
  entry: path.resolve(__dirname, './client/index.jsx'),

  mode: 'development',

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              compact: true,
              presets: [
                'env',
                'react',
              ],
            },
          },
        ],
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
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
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
          test: /node_modules/,
        },
      },
    },
  },

  output: {
    path: path.resolve(__dirname, './dist/client'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: 'client/index.html',
    }),
  ],

  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
    modules: [ // Because client 'node_modules' are in a seperate folder.
      path.resolve(__dirname, './client/node_modules'),
      path.resolve(__dirname, './node_modules'), // webpack-dev-server modules.
    ],
  },
};
