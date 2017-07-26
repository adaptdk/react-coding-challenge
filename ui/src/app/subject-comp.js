import React, { Component, PropTypes } from 'react';
import { Tabs, Tab, Alert } from 'react-bootstrap';

import Book from './book-comp';
import { get } from './fetch-utils';
import {
  SUBJECTS_API_PATH,
} from './constants';


const BookTabs = ({ subjects, routes }) => {
  const createTabs = () => (subjects.map((subject, idx) => {
    return (
      <Tab eventKey={idx} key={idx} title={subject}>
        <Book subject={subject} routes={routes}/>
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
  routes: PropTypes.array.isRequired,
};

class Subject extends Component {
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
    const { routes } = this.props;
    const { subjects } = this.state;

    return (
      <div>
        {subjects.length >= 0 ? 
          <BookTabs subjects={subjects} routes={routes}/> : 
          <Alert bsStyle="danger">
            <h4>Oh snap! You got an error!</h4>
          </Alert>
        }
      </div>
    );
  }
}

export default Subject;