import React, { Component } from "react";
import GetScience from "./components/GetJson/GetScience";
import GetFiction from "./components/GetJson/GetFiction";
import Contact from "./components/Contact";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
//Does not work with the new method of bootstrap importing
import { Tab, Tabs } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <div>
      <style>
      {`
  a {
      color:grey;
      font-size:1.2em;
 }
  a:hover {
      color:grey;
 }
  .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active{
      font-size:1.2em;
      color:black;
 }
  .btn {
      margin-right: 1em;
 }
  .btn-custom {
      background: transparent;
      color: black;
      border-color:transparent;
      text-align: left;
 }
  .btn-custom:focus {
      outline: none !important;
      outline-offset: none !important;
 }
`}
  </style>
      <Contact />
      <Tabs className="tab-custom" defaultActiveKey="home" transition={false}>
        <Tab eventKey="home" title="Fiction">
          <GetFiction />
        </Tab>
        <Tab eventKey="profile" title="Science">
          <GetScience />
        </Tab>
      </Tabs>
      </div>
    );
  }
}

export default App;
