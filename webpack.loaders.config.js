const path = require('path');
const webpack = require('webpack');
const WebpackStatsPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

const isProduction = process.env.NODE_ENV === 'production';
const cssLoaderOptions = {
  modules: true,
  camelCase: true,
  minimize: isProduction,
  importLoaders: 1,
  localIdentName: '[name]__[local]___[hash:base64:5]',
};

const browserEntry = path.join(__dirname, 'src', 'browser.js');
const serverEntry = path.join(__dirname, 'src', 'server.js');

// webpack-hot-server-middleware requires browser app to be named `client`.
const browserName = () => 'client';
const serverName = () => 'server';

const chunkOutput = () => isProduction && ({
  filename: path.join('js', '[name].[hash].js'),
  path: path.resolve(__dirname, 'build'),
  publicPath: '/'
}) || ({
  filename: path.join('js', '[name].[hash].js'),
  path: path.resolve(__dirname, 'build'),
  publicPath: '/'
});

const babelLoader = () => ({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loaders: ['babel-loader'],
});

const cssMatch = () => /\.(css|scss)$/;
const styleLoader = () => ({
  loader: 'style-loader',
});
const browserCssLoader = () => ({
  loader: 'css-loader',
  options: Object.assign({}, cssLoaderOptions),
});
const serverCssLoader = () => ({
  loader: 'css-loader/locals',
  options: Object.assign({}, cssLoaderOptions),
});
const autoPrefixerLoader = () => ({
  loader: 'autoprefixer-loader',
});
const sassLoader = () => () => ({
  loader: 'sass-loader',
  options: {
    includePaths: ['node_modules'],
  },
});

const vendorEntry = () => (['react', 'react-dom', 'redux', 'react-router']);
const browserAppEntry = () => isProduction && ([
  browserEntry,
]) || ([
  'react-hot-loader/patch',
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
  'webpack/hot/only-dev-server',
  browserEntry,
]);
const serverAppEntry = () => ([
  serverEntry,
]);

const webpackStatsPlugin = () => new WebpackStatsPlugin({
  filename: 'stats.json',
});
const commonsChunkPlugin = () => isProduction && new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  filename: path.join('js', 'vendor.[hash].js'),
}) || new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  filename: path.join('js', 'vendor.[hash].js'),
});
const uglifyPlugin = () => new webpack.optimize.UglifyJsPlugin({
  compress: { warnings: false }
});
const envPlugin = () => isProduction && new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production'),
  },
}) || new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('development'),
  },
});

module.exports = {
  serverName,
  browserName,
  chunkOutput,
  babelLoader,
  cssMatch,
  browserCssLoader,
  serverCssLoader,
  autoPrefixerLoader,
  styleLoader,
  sassLoader,
  vendorEntry,
  browserAppEntry,
  serverAppEntry,
  commonsChunkPlugin,
  webpackStatsPlugin,
  uglifyPlugin,
  envPlugin,
};
