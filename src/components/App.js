import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return this.props.children;
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
