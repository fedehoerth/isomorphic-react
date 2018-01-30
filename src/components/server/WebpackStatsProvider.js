import React from 'react';
import PropTypes from 'prop-types';

import webpackStatsPropType from './webpackStatsPropType';

class WebpackStatsProvider extends React.Component {
  getChildContext() {
    return {
      webpackStats: this.props.webpackStats,
    };
  }

  render() {
    return this.props.children;
  }
}

WebpackStatsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  webpackStats: webpackStatsPropType.isRequired,
};

WebpackStatsProvider.childContextTypes = {
  webpackStats: webpackStatsPropType,
}

export default WebpackStatsProvider;
