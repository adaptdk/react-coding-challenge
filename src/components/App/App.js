import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import SubjectsSelector from '../../containers/SubjectsSelector/index';
import BooksList from '../../containers/BooksList/index';
import BookEditForm from '../../containers/BookEditForm/index';

const App = () => {
  return (
    <Grid className="App">
      <Row>
        <Col sm={12}>
          <PageHeader>React Coding Challenge</PageHeader>
        </Col>
      </Row>
      <Row>
        <Col sm={12} lg={4}>
          <SubjectsSelector />
        </Col>
        <Col sm={12} lg={4}>
          <BooksList />
        </Col>
        <Col sm={12} lg={4}>
          <BookEditForm />
        </Col>
      </Row>
    </Grid>
  );
};

export default App;
