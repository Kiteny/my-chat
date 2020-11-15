import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  const { criticalError } = state.app;
  return { criticalError };
}

class CriticalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children, criticalError } = this.props;

    if (hasError || criticalError) {
      return <h1>Что-то пошло сильно не так! Извините.</h1>;
    }

    return children;
  }
}

CriticalErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  criticalError: PropTypes.object,
};

CriticalErrorBoundary.defaultProps = {
  criticalError: null,
};

export default connect(mapStateToProps)(CriticalErrorBoundary);
