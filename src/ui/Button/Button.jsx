/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ title, type }) => (
  <button className="ui-button" type={type}>
    {title}
  </button>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
