import React from 'react';
import PropTypes from 'prop-types';
import { StaticRouter } from 'react-router';

import routes from '../../config/routes';
import RouterLoader from '../common/RouterLoader';

function ServerApp({ location }) {
  const context = {};

  return (
    <StaticRouter location={location} context={context}>
      <RouterLoader location={location} routes={routes} />
    </StaticRouter>
  );
}

ServerApp.propTypes = {
  location: PropTypes.string.isRequired,
};

export default ServerApp;
