import React, { Component, PropTypes } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import Book from './book-comp';
import { get } from './fetch-utils';
import {
  SUBJECTS_API_PATH,
} from './constants';


const BookTabs = ({ subjects }) => {
  const createTabs = () => (subjects.map((subject, idx) => {
    return (
      <Tab eventKey={idx} key={idx} title={subject}>
        <Book subject={subject} />
      </Tab>
    );
  }));

  return (
    <Tabs defaultActiveKey={0} id="books-subjects" animation={false}>
      {createTabs()}
    </Tabs>
  );
};

BookTabs.propTypes = {
  subjects: PropTypes.array.isRequired,
};

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
        <BookTabs subjects={subjects}/>
      </div>
    );
  }
}

export default Books;