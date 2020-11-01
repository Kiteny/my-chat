import PropTypes from 'prop-types';
import React from 'react';

import { Button } from '../../../ui';
import './UserForm.scss';

const UserForm = ({
  onSubmit, title, buttonTitle, children,
}) => (
  <form onSubmit={onSubmit} className="user-form">
    <h2 className="user-form__title">
      {title}
    </h2>
    <div className="user-form__fields-container">
      {children}
    </div>

    <Button title={buttonTitle} type="submit" />
  </form>
);

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,

  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default UserForm;
