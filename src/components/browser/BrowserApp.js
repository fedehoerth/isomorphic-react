import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import routes from '../../config/routes';
import RouterLoader from '../common/RouterLoader';

function BrowserApp() {
  return (
    <BrowserRouter>
      <RouterLoader routes={routes} />
    </BrowserRouter>
  );
}

export default BrowserApp;
