import PropTypes from 'prop-types';
import React from 'react';

import { Button } from '../../../ui';
import './UserForm.scss';

const UserForm = ({
  onSubmit, title, buttonTitle, children, link, errorMessage,
}) => (
  <form onSubmit={onSubmit} className="user-form">
    <div className="user-form__errorMessage">{ errorMessage }</div>

    <h2 className="user-form__title">
      {title}
    </h2>

    <div className="user-form__fields-container">
      {children}
    </div>

    <Button title={buttonTitle} type="submit" />

    <span className="user-form__link">{link}</span>
  </form>
);

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  link: PropTypes.node,

  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

UserForm.defaultProps = {
  link: null,
  errorMessage: '',
};

export default UserForm;
