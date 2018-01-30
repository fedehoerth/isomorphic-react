const chalk = require('chalk');
const express = require('express');
const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const development = process.env.NODE_ENV !== 'production';
const newLine = (n) => Array.apply(null, Array(n))
  .map(() => process.stdout.write('\n'));

const app = express();

/**
 * Production Build
 */
if (process.argv.indexOf('--build') !== -1) {
  const rimraf = require('rimraf');
  const webpack = require('webpack');

  const browserConfig = require('./webpack.config.js');
  const serverConfig = require('./webpack.server.config.js');
  const compiler = webpack([browserConfig, serverConfig]);

  return rimraf(path.join(__dirname, 'build'), function () {
    compiler.run(function (err, stats) {
      process.stdout.write(stats.toString({
        colors: true,
      }));
      newLine(2);
      process.stdout.write(chalk.greenBright.bold('⚙️⚙️ Compilation Finished ⚙️⚙️'));
      newLine(2);
    })
  })
}

if (development) {
  require('source-map-support').install();

  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
  const DashboardPlugin = require('webpack-dashboard/plugin');

  const ansiHTML = require('ansi-html');
  const { html, terminal } = require('print-error');

  const browserConfig = require('./webpack.config.js');
  const serverConfig = require('./webpack.server.config.js');

  const compiler = webpack([browserConfig, serverConfig]);

  const serverCompiler = compiler.compilers.find(compiler => compiler.name === 'server');
  const browserCompiler = compiler.compilers.find(compiler => compiler.name === 'client');

  // Get assetsByChunkName@webpack-stats-plugin
  let webpackStats = null;
  browserCompiler.plugin('emit', (compilation, callback) => {
    webpackStats = JSON.parse(compilation.assets['stats.json'].source());
    callback();
  });

  app.use(express.static(path.join(__dirname, 'build')))
  app.use(webpackDevMiddleware(compiler, {
    serverSideRender: true,
    stats: {
      colors: true
    },
  }));
  app.use(webpackHotMiddleware(browserCompiler));
  app.use(webpackHotServerMiddleware(compiler));
  app.use((err, req, res, next) => {
    console.error(terminal(err));
    res.send(ansiHTML(html(err, { fontSize: '12px' })));
  });
} else {
  const server = require('./build/js/server').default;

  // Generate production Server Side Rendering middleware
  const webpackStats = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'build', 'stats.json'), 'utf8'),
  );
  const compilerStats = {
    clientStats: webpackStats,
  };
  const serverMiddleware = server(compilerStats);

  // Production Middlewares
  app.use(express.static(path.join(__dirname, 'build')));
  app.use(serverMiddleware);
}


const applicationPort = () => {
  const tentativePort = process.argv.filter(x => x.includes('--port'));
  const fallbackPort = 8000;
  if (tentativePort.length) {
    return tentativePort[0];
  }

  return fallbackPort;
}

const httpServer = app.listen(applicationPort(), () => {
  httpServer.keepAliveTimeout = 0;
  process.stdout.write(chalk.cyanBright.bold(`
    🌎  Ready on http://0.0.0.0:${applicationPort()}

    ⚙️  NODE_ENV = ${development ? 'DEVELOPMENT' : 'PRODUCTION'}
  `));
  newLine(3);
});
