import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Document from './components/server/Document';
import WebpackStatsProvider from './components/server/WebpackStatsProvider';

const isDevelopment = process.env.NODE_ENV !== 'production';

function server(compilerStats) {
  return function serverMiddleware(req, res, next) {
    const appString = ReactDOMServer.renderToString(
      <WebpackStatsProvider webpackStats={compilerStats.clientStats}>
        <Document location={req.url} />
      </WebpackStatsProvider>
    );

    res.write('<!DOCTYPE html>');
    res.write(appString);
    res.send();
  }
}

export default server;
