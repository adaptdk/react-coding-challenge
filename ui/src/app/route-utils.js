import React, { Component, PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';

export const RoutesRenderer = (route) => (
  <Route path={route.path} render={props => (
    React.cloneElement(
      <route.component 
        {...props} 
        routes={route.routes} 
        context={route.context}
      />
    )
  )}/>
);

export class RootRedirecter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { to } = this.props;

    return <Redirect to={{
      pathname: to,
      state: { from: this.props.location },
    }}/>;
  }
}

RootRedirecter.propTypes = {
  to: PropTypes.string.isRequired,
};
