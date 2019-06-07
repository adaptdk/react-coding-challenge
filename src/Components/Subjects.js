import React, { Component } from "react";
import SubjectItem from "./SubjectItem";
import endpoint from "../util/endpoint";

export default class Subjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: [],
    };
  }

  componentDidMount() {
    const subjects = endpoint.getSubjects();
    subjects.then(subject => {
      this.setState({
        subjects: subject,
      });
    });
  }

  selectSubject = subject => {
    this.props.searchBooks(subject);
  };

  render() {
    return (
      <div className="Subjects">
        <div className="columnTitle">Subjects</div>
        <div className="subjectsList">
          {this.state.subjects.map((sbj, index) => {
            return (
              <SubjectItem
                key={index}
                subject={sbj}
                setActive={() => this.selectSubject(sbj)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
