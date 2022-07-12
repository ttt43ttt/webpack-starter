const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

const NODE_ENV = process.env.NODE_ENV || 'development';
const { ifProduction, ifDevelopment } = getIfUtils(NODE_ENV);

module.exports = {
  mode: NODE_ENV,
  entry: {
    app: removeEmpty(['./src/index.js'])
  },
  output: {
    path: path.join(__dirname, 'build/dist'),
    filename: '[name].js'
  },

  resolve: {
    // modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  module: {
    rules: [
      // JS
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      // CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: removeEmpty([
    ifDevelopment(new webpack.HotModuleReplacementPlugin()),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
      minify: false,
      hash: false
    })
  ]),

  devtool: ifDevelopment('source-map'),

  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: true,
    port: 9000
  }
};
