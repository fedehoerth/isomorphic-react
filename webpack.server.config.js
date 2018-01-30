const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const {
  serverName,
  serverAppEntry,
  babelLoader,
  cssMatch,
  serverCssLoader,
} = require('./webpack.loaders.config');

const server = {
  name: serverName(),
  target: 'node',
  devtool: 'sourcemap',
  externals: [nodeExternals()],
  entry: serverAppEntry(),
  output: {
    filename: path.join('js', 'server.js'),
    path: path.resolve(__dirname, 'build'),
    publicPath: 'build',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      babelLoader(),
      {
        test: cssMatch(),
        use: [
          serverCssLoader(),
        ],
      },
    ],
  },
};

module.exports = server;
