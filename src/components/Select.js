import React from "react";

import Form from "react-bootstrap/Form";

export default function Select(props) {
  return (
    <Form>
      <Form.Control as="select" multiple onChange={props.onSelect}>
        {props.children}
      </Form.Control>
    </Form>
  );
}
