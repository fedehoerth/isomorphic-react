import React from 'react';
import PropTypes from 'prop-types';
import flatten from 'ramda/src/flatten';

import webpackStatsPropType from './webpackStatsPropType';

function withPublicPath(fileName) {
  return fileName
    ? fileName.startsWith('/') ? fileName : `/${fileName}`
    : null;
}

function files(fileNames) {
  return fileNames && flatten([fileNames]).filter(x => x && x.includes('.js')).map(withPublicPath);
}

function Script({ chunkName }, context) {
  const { assetsByChunkName } = context.webpackStats;
  const fileNames = files(assetsByChunkName[chunkName]);

  return (
    fileNames
      ? fileNames.map(fileName => (<script src={fileName} type="text/javascript" />))
      : null
  );
}

Script.propTypes = {
  chunkName: PropTypes.string.isRequired,
};

Script.contextTypes = {
  webpackStats: webpackStatsPropType.isRequired,
}

export default Script;
