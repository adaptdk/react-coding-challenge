import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, ButtonToolbar, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form'
import { updateBook } from '../../redux/modules/books';
import { FieldSet } from '../../components/Form';

class BookEditForm extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    updateBook: PropTypes.func,
  };

  static defaultProps = {
    initialValues: {},
  };

  handleBookEdit = (book) => {
    const { updateBook, selectSubjects } = this.props;
    updateBook(book, selectSubjects);
  };

  getFormConfig = (book) => {
    const normalize = (value) => (value.split(',').map((item) => (item.trim())));
    return [
      {
        field: 'title',
        type: 'single',
        title: 'Title',
      },
      {
        field: 'authors',
        type: 'nested',
        title: 'Author',
        children: [
          {
            label: 'Name',
            property: 'name',
          },
          {
            label: 'Birth year',
            property: 'birth_year',
          },
          {
            label: 'Death year',
            property: 'death_year',
          },
        ],
      },
      {
        field: 'bookshelves',
        type: 'array',
        title: 'Bookshelves',
        normalize,
      },
      {
        field: 'download_count',
        type: 'single',
        title: 'Download count',
      },
      {
        field: 'formats',
        type: 'multiple',
        title: 'Formats',
        children: 'formats' in book ? Object.keys(book.formats) : [],
        placeholder: 'Url',
      },
      {
        field: 'languages',
        type: 'array',
        title: 'Languages',
        normalize,
      },
      {
        field: 'media_type',
        type: 'single',
        title: 'Media Type',
      },
      {
        field: 'subjects',
        type: 'array',
        title: 'Subjects',
        normalize,
      },
    ];
  };

  render() {
    const { initialValues, handleSubmit, pristine, reset, submitting } = this.props;
    const config = this.getFormConfig(initialValues);
    return (
      initialValues.id ?
        <Panel header="Update book">
          <form onSubmit={handleSubmit(this.handleBookEdit)}>
            <FieldSet config={config}/>
            <ButtonToolbar>
              <Button
                bsStyle="primary"
                type="submit"
                disabled={pristine || submitting}
              >
                Submit
              </Button>
              <Button
                type="reset"
                disabled={pristine || submitting}
                onClick={reset}
              >
                Undo Changes
              </Button>
            </ButtonToolbar>
          </form>
        </Panel> : null
    );
  };
}

const mapStateToProps = ({ books, subjects }) => ({
  initialValues: books.selected,
  selectSubjects: subjects.selected,
});

const mapDispatchToProps = (dispatch) => ({
  updateBook: (book, subjects) => {
    dispatch(updateBook(book, subjects));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'bookEditForm',
    enableReinitialize: true,
  })(BookEditForm),
);
