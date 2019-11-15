import React, { Component } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

class GetScience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: []
    };
  }
  componentDidMount() {
    // I will use  api from localhost
    fetch("http://localhost:3000/Science")
      .then(response => response.json())
      .then(
        // handle the result
        result => {
          this.setState({
            isLoaded: true,
            posts: result
          });
        },
        // Handle error
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  render() {
    const { error, isLoaded, posts } = this.state;
    if (error) {
      return <div>Error in loading</div>;
    } else if (!isLoaded) {
      return <div>Loading ...</div>;
    } else {
      return (
        <div>
          {          posts.map(post => (
                    <Accordion>
                      <Card>
                        <Card.Header>

                          <Accordion.Toggle class="btn-custom" eventKey="0">
                            <li>{post.title} &#8628;</li>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <Form.Group controlId="validationCustom01">
                              <Form.Label><h6>ID</h6></Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="ID"
                                defaultValue={post.id}
                              />
                            </Form.Group>
                            <Form.Group controlId="validationCustom01">
                              <Form.Label><h6>Bookshelves</h6></Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Bookshelves"
                                defaultValue={post.bookshelves}
                              />
                            </Form.Group>
                            <Form.Group controlId="validationCustom01">
                              <Form.Label><h6>Download count</h6></Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Download count"
                                defaultValue={post.download_count}
                              />
                            </Form.Group>
                            <Form.Group controlId="validationCustom01">
                              <Form.Label><h6>Languages</h6></Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Languages"
                                defaultValue={post.languages}
                              />
                            </Form.Group>
                            <Form.Group controlId="validationCustom01">
                              <Form.Label><h6>Media type</h6></Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Media type"
                                defaultValue={post.media_type}
                              />
                            </Form.Group>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  ))}
                </div>
              );
            }
          }
        }

export default GetScience;
