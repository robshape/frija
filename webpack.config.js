const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './client/index.jsx'),

  mode: 'development',

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$|\.jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
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
    modules: [
      path.resolve(__dirname, './client/node_modules'),
      path.resolve(__dirname, './node_modules'), // webpack-dev-server modules.
    ],
  },
};
