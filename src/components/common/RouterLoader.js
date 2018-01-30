import React from 'react';
import ReactRouterRoute from 'react-router/Route';

import { withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';

function RouterLoader({ routes, location }) {
  return (
    <div key='route'>
      <ReactRouterRoute
        location={location}
        render={() => renderRoutes(routes)}
      />
    </div>
  )
}

export default withRouter(RouterLoader)
