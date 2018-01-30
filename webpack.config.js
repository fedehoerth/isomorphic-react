const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {
  browserName,
  browserAppEntry,
  vendorEntry,
  chunkOutput,
  babelLoader,
  cssMatch,
  styleLoader,
  browserCssLoader,
  autoPrefixerLoader,
  sassLoader,
  webpackStatsPlugin,
  commonsChunkPlugin,
  uglifyPlugin,
  envPlugin,
} = require('./webpack.loaders.config');

const dev = {
  name: browserName(),
  target: 'web',
  entry: {
    app: browserAppEntry(),
    vendor: vendorEntry(),
  },
  devtool: 'eval-source-map',
  output: chunkOutput(),
  module: {
    rules: [
      babelLoader(),
      {
        test: cssMatch(),
        use: [
          styleLoader(),
          browserCssLoader(),
          autoPrefixerLoader(),
          sassLoader(),
        ]
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    webpackStatsPlugin(),
    commonsChunkPlugin(),
    envPlugin(),
  ]
}

const extractCSS = new ExtractTextPlugin({
  filename: path.join('styles', '[name].[hash].css')
});

const prod = {
  name: browserName(),
  target: 'web',
  entry: {
    app: browserAppEntry(),
    vendor: vendorEntry(),
  },
  devtool: false,
  output: chunkOutput(),
  module: {
    rules: [
      babelLoader(),
      {
        test: cssMatch(),
        use: extractCSS.extract({
          use: [
            browserCssLoader(),
            autoPrefixerLoader(),
            sassLoader(),
          ]
        })
      },
    ],
  },
  plugins: [
    extractCSS,
    webpackStatsPlugin(),
    uglifyPlugin(),
    commonsChunkPlugin(),
    envPlugin(),
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports = prod;
} else {
  module.exports = dev;
}
