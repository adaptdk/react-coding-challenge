import React from "react";

import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

export default function BookInfoForm(props) {
  const handleCategoryChange = (e) => {
    let newSubjectsList = [...props.currentBook.subjects];
    if (newSubjectsList.includes(e.target.innerText)) {
      newSubjectsList = newSubjectsList.filter((s) => s !== e.target.innerText);
    } else {
      newSubjectsList.push(e.target.innerText);
    }
    props.setCurrentBook({ ...props.currentBook, subjects: newSubjectsList });
  };

  const handleAuthorsChange = function (e) {
    props.setCurrentBook({
      ...props.currentBook,
      authors: [{ ...props.currentBook.authors[0], name: e.target.value }],
    });
  };

  const handleTitleChange = function (e) {
    props.setCurrentBook({
      ...props.currentBook,
      title: e.target.value,
    });
  };

  return (
    <React.Fragment>
      <Form>
        <Form.Group controlId="formAuthors">
          <Form.Label>Subjects:</Form.Label>
          {props.subjects.map((subject, index) => (
            <Badge
              variant={
                props.currentBook.subjects.includes(subject)
                  ? "primary"
                  : "secondary"
              }
              key={index}
              onClick={handleCategoryChange}
            >
              {subject}
            </Badge>
          ))}
        </Form.Group>
        <Form.Group controlId="formAuthors">
          <Form.Label>Author</Form.Label>
          {props.currentBook.authors.map((author, index) => (
            <Form.Control
              type="text"
              placeholder="Author"
              value={author.name}
              key={index}
              onChange={handleAuthorsChange}
            />
          ))}
        </Form.Group>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Author"
            value={props.currentBook.title}
            onChange={handleTitleChange}
          />
        </Form.Group>

        <div className="button-group">
          <Button
            variant="danger"
            onClick={() => {
              props.getBookById(props.currentBook.id);
            }}
          >
            Cancel
          </Button>
          <Button variant="success" onClick={props.updateCurrentBook}>
            Save changes
          </Button>
        </div>
      </Form>
    </React.Fragment>
  );
}
