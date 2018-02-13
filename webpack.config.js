const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, './dist/client'),
  },

  entry: {
    app: path.resolve(__dirname, './client/index.jsx'),
    vendor: [
      'prop-types',
      'react',
      'react-dom',
    ],
  },

  module: {
    rules: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            'react',
          ],
        },
        test: /\.jsx$/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist/client'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: 'client/index.html',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: Infinity,
      name: 'vendor',
    }),
  ],

  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
    modules: [
      path.resolve(__dirname, './client/node_modules'),
      path.resolve(__dirname, './node_modules'), // webpack-dev-server modules.
    ],
  },
};
