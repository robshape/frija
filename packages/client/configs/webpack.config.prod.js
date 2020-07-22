/*

  Frija - The Swedish general election and Riksdag on the Ethereum blockchain.
  Copyright (C) 2020 Frija contributors.

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

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const { dependencies } = require('../package.json');

const chunkedDependencies = () =>
  Object.keys(dependencies)
    .map((dependency) => {
      const dependencyName = dependency.replace('@', '').replace('/', '-');
      return {
        [`vendors-${dependencyName}`]: {
          test: new RegExp(`/node_modules/${dependency}/`),
        },
      };
    })
    .reduce((accumulator, currentValue) => ({
      ...accumulator,
      ...currentValue,
    }));

const config = (env) => ({
  mode: 'production',

  module: {
    rules: [
      {
        include: path.resolve(process.cwd(), './src/'),
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: './configs/babel.config.js',
            },
          },
        ],
      },
      {
        include: path.resolve(process.cwd(), './src/'),
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
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
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin({
        cache: false,
      }),
    ],
    // https://webpack.js.org/guides/caching/
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: chunkedDependencies(),
      chunks: 'all',
      maxInitialRequests: Infinity,
    },
  },

  output: {
    filename: '[name].[contenthash].js',
  },

  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new CompressionPlugin({
      cache: false,
    }),
    new CopyPlugin({
      patterns: ['./src/assets/'],
    }),
    new HtmlWebpackPlugin({
      cache: false,
      minify: {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        decodeEntities: true,
        minifyURLs: true,
        quoteCharacter: "'",
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true,
      },
      scriptLoading: 'defer',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    env && env.ANALYZE_BUNDLE && new BundleAnalyzerPlugin(),
  ].filter(Boolean),

  resolve: {
    extensions: ['.js', '.jsx'],
  },
});

module.exports = config;
