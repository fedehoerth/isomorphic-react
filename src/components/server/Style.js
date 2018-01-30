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
  return fileNames && flatten([fileNames]).filter(x => x && x.includes('.css')).map(withPublicPath);
}

function Style({ chunkName }, context) {
  const { assetsByChunkName } = context.webpackStats;
  const fileNames = files(assetsByChunkName[chunkName]);

  return (
    fileNames
      ? fileNames.map(fileName => (<link type="text/css" rel="stylesheet" href={fileName} />))
      : null
  );
}

Style.propTypes = {
  chunkName: PropTypes.string.isRequired,
};

Style.contextTypes = {
  webpackStats: webpackStatsPropType.isRequired,
}

export default Style;
