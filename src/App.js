import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Display from './Display.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React book app</h2>
        </div>
        <div className="Menu">
          <Display/>

        </div>

      </div>
    );
  }
}



export default App;
