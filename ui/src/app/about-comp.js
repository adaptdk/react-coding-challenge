import React from 'react';


const About = () => {
  return (
    <div>
      <h1>Simple page application for getting info about books.</h1>
      <p>
        What was used for creating this application:
        <ul>
          <li>react</li>
          <li>react-router</li>
          <li>react-bootstrap</li>
          <li>path-to-regexp</li>
          <li>isomorphic-fetch</li>
          <li>...</li>
        </ul>
        The intemtion of this application was to remember how to work with react. <br />
        What would be nice to accomplish:
        <ul>
          <li>Decouple code by using flux architecture. Such pattern should seperate view from logic</li>
          <li>Implement error handling in case if api server will not respond</li>
          <li>Refactor code</li>
          <li>and much more ... :(</li>
        </ul>
      </p>
    </div>
  );
};

export default About;
