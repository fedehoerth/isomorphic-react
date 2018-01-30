import React from 'react';
import PropTypes from 'prop-types';
import classnames from './message.scss';

function Message({ message }) {
  return (<h1 className={classnames.hola}>{message} :D</h1>);
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Message;
