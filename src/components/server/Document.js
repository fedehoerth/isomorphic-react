import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';
import Head from 'react-declarative-head';

import ServerApp from './ServerApp';
import Script from './Script';
import Style from './Style';

function Document({ location }) {
  const appString = ReactDOMServer.renderToString(<ServerApp location={location} />);

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <Style chunkName="app" />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{__html: appString}} />

        {/* Include chunks bundles */}
        <Script chunkName="vendor" />
        <Script chunkName="app" />
      </body>
    </html>
  );
}

Document.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Document;
