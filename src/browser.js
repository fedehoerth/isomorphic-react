import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import BrowserApp from './components/browser/BrowserApp';

const rootEl = document.getElementById('root');

if (process.env.NODE_ENV === 'production') {
  ReactDOM.hydrate((
  <BrowserApp />
  ), rootEl)
} else {
  const renderDevApp = App => ReactDOM.hydrate((
    <AppContainer>
      <App />
    </AppContainer>
  ), rootEl)

  renderDevApp(BrowserApp)

  if (module.hot) {
    module.hot.accept('./components/browser/BrowserApp', () => renderDevApp(require('./components/browser/BrowserApp').default))
  }
}
