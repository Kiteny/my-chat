import React from 'react';
import PropTypes from 'prop-types';

import './Field.scss';

const Field = ({
  name, type, forwardedRef, title,
}) => (
  <label htmlFor={name} className="ui-field">
    <h4 className="ui-field__title">
      {title}
      :
    </h4>
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

  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default React.forwardRef((props, ref) => <Field {...props} forwardedRef={ref} />);
