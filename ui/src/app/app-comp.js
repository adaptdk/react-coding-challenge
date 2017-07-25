import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Row, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { RoutesRenderer } from './route-utils';
import { routes } from './config';


class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="container">
        <div className="clearfix">
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <Image src="assets/logo.png"/>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <LinkContainer to="/books">
                <NavItem eventKey={1}>
                  Books
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/about">
                <NavItem eventKey={2}>
                  About
                </NavItem>
              </LinkContainer>
            </Nav>
          </Navbar>
        </div>
        <Row className="content">
          {routes.map((route, i) => (
            <RoutesRenderer key={i} {...route}/>
          ))}
        </Row>
      </div>
    );
  }
}

export default App;
