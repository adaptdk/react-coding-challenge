import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import "bootstrap/dist/css/bootstrap.min.css";

function Contact() {
  return (
    <Jumbotron>
      <h1>Hey,</h1>
      <p>
        so I know, that I haven't implemented the ideal solution, but I would
        love to learn more ES6 and React.js working with a talented team at
        Adapt - I'm willing to learn anything thrown at my side.
      </p>
      <p>
        I've got a background working as a web developer and designer, python
        and java programmer. Plus, I'm super geeky, especially around topics
        such as AR/ VR and DIY embedded engineering.
      </p>
      <p>
        <ButtonToolbar>
          <Button href="https://github.com/pijus-r" variant="outline-primary">
            Front-end
          </Button>

          <Button
            href="https://www.behance.net/pijusrancevas"
            variant="outline-dark"
          >
            Github
          </Button>
        </ButtonToolbar>
      </p>
    </Jumbotron>
  );
}

export default Contact;
