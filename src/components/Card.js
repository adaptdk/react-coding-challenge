import React from "react";

import Card from "react-bootstrap/Card";

export default function StepCard(props) {
  return (
    <Card>
      <Card.Header>{props.header}</Card.Header>
      <Card.Body>{props.children}</Card.Body>
    </Card>
  );
}
