import React from 'react';
import PropTypes from 'prop-types';

import './Field.scss';

const Field = ({
  name, type, forwardedRef, title, errorMessage,
}) => (
  <label htmlFor={name} className="ui-field">
    <h4 className="ui-field__title">
      {title}
      :
    </h4>
    <div className="ui-field__error-message">{errorMessage}</div>
    <input
      name={name}
      id={name}
      type={type}
      ref={forwardedRef}
    />
  </label>
);

Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,

  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

Field.defaultProps = {
  errorMessage: '',
};

export default React.forwardRef((props, ref) => <Field {...props} forwardedRef={ref} />);
