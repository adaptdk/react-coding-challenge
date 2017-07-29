import React from "react";
import "../stylesheets/main.scss";
import { connect } from "react-redux";

// app component
class App extends React.Component {
  // render
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
}

export default connect()(App);