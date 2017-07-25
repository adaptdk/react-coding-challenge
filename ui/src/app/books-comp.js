import React, { Component, PropTypes } from 'react';

import { get } from './fetch-utils';
import {
  SUBJECTS_API_PATH,
} from './constants';


class Books extends Component {
  constructor(props) {
    super(props);
    this.state = { subjects: [] };
  }

  componentDidMount() {
    get(SUBJECTS_API_PATH).then((res) => {
      this.setState({ ...{ subjects: res } });
    });
  }

  render() {
    const { subjects } = this.state;

    return (
      <div>
        <ul>
          { 
            subjects.map((subject, idx) => {
              return <li key={idx}>{subject}</li>
            }) 
          }
        </ul>
      </div>
    );
  }
}

export default Books;