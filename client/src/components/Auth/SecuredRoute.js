import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      const { auth, history } = this.props;
      if (!auth) {
        history.push('/login');
      }
    }

    renderContent() {
      const { auth } = this.props;
      switch (auth) {
        case null || 'checkAuth':
          return <p>Loading...</p>;
        case false:
          return <p>Redirecting to login...</p>;
        default:
          return <ChildComponent {...this.props} />;
      }
    }

    render() {
      return <div>{this.renderContent()}</div>;
    }
  }

  function mapStateToProps({ auth }) {
    return { auth };
  }

  ComposedComponent.propTypes = {
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    auth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.shape({})]).isRequired,
  };

  return connect(mapStateToProps)(ComposedComponent);
};
