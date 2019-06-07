import React, { Component } from "react";

export default class SubjectItem extends Component {
  render() {
    return (
      <div className="subjectItem" onClick={this.props.setActive}>
        {this.props.subject}
      </div>
    );
  }
}
