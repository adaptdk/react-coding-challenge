import React, { Component } from 'react';

import SubjectSelection from '../containers/subjectSelection';
import BookSelection from '../containers/bookSelection';
import BookForm from '../containers/bookForm';

export default class App extends Component {
  render() {
    return (
      <div>
          <SubjectSelection />
          <BookSelection />
          <BookForm />
      </div>
    );
  }
}
