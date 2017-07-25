import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { RoutesRenderer } from './route-utils';
import { routes } from './config';


class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <header>
          <nav>
            <ul>
              <li><Link to="/books">Books</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
        </header>
        {routes.map((route, i) => (
          <RoutesRenderer key={i} {...route}/>
        ))}
      </div>
    );
  }
}

export default App;
