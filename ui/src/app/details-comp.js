import React, { PropTypes, Component } from 'react';
import pathToRegexp from 'path-to-regexp';
import { 
  Form,
  FormGroup,
  Col,
  FormControl,
  Button,
  Jumbotron,
} from 'react-bootstrap';
import _ from 'underscore';

import { get, put } from './fetch-utils';
import { renderInputText, renderInputNumber } from './ui-utils';
import { 
  BOOK_DETAIL_API_PATH,
  BOOK_DETAIL_UPDATE_API_PATH, 
} from './constants';

const bookDetailsPath = pathToRegexp.compile(BOOK_DETAIL_API_PATH);
const bookUpdatePath = pathToRegexp.compile(BOOK_DETAIL_UPDATE_API_PATH);

const defaultState = {
  details: {
    id: null,
    authors: [],
    bookshelves: [],
    download_count: null,
    formats: {},
    languages: [],
    media_type: null,
    subjects:[],
    title: null,
  },
};

export class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      ...defaultState, 
      ...{ renderDetails: true }, 
      ...{ selectedItems: [] }, 
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
    this.fetchBookDetails(params);
  }

  componentWillReceiveProps(nextProps) {
    const { params } = this.props.match;
    const { params: nextParams } = nextProps.match;

    if (params.id !== nextParams.id || params.subject !== nextParams.subject) {
      this.fetchBookDetails(nextParams);
    }
  }

  fetchBookDetails(params) {
    get(bookDetailsPath(params)).then((res) => {
      this.setState({ ...{ details: res[0] }, ...{ renderDetails: true } });
    });
  }

  textHandler(event) {
    const fieldVal = event.target.value;
    let fieldName = event.target.name;
    let tokens = fieldName.split('[');
    let detailsToUpdate;

    if (tokens.length > 1) {
      fieldName = tokens[0];

      const idx = tokens[1].split(']')[0];
      const key = tokens[1].split(']')[1].replace('.', '');

      detailsToUpdate = {details: {...this.state.details}};
      key ? (detailsToUpdate.details[fieldName][idx][key] = fieldVal) : (detailsToUpdate.details[fieldName][idx] = fieldVal);
    } else {
      detailsToUpdate = {
        details: {...this.state.details, [fieldName]: fieldVal},
      };
    }

    
    this.setState({ ...detailsToUpdate });
  }

  numberHandler(event) {
    const fieldVal = event.target.value;
    const fieldName = event.target.name;
    
    const detailsToUpdate = {
      details: {...this.state.details, [fieldName]: fieldVal},
    };

    this.setState({ ...detailsToUpdate });
  }

  submitHandler(event) {
    event.preventDefault();
    const { params } = this.props.match;
    const { details } = this.state; 
    put(bookUpdatePath({ id: params.id }), details)
      .then(() => {/* display nice message */})
      .catch(() => {/* display ugly message */});
  }

  addFormatHandler(event) {
    event.preventDefault();
    let { details: detailsToUpdate } = this.state;

    if (this.formatKeyInput && this.formatValueInput) {
      detailsToUpdate.formats[this.formatKeyInput.value] = this.formatValueInput.value;
      this.formatKeyInput.value = '';
      this.formatValueInput.value = '';
      this.setState({ ...detailsToUpdate });
    }
  }

  deleteFormatHandler(event) {
    event.preventDefault();
    const { selectedItems, details } = this.state;
    const formats = _.omit(details.formats, selectedItems);
    let { details: detailsToUpdate } = this.state;
    detailsToUpdate.formats = formats;
    this.setState({ ...detailsToUpdate });
  }

  selectHandler(event) {
    const target = event.target;
    const options = [].slice.call(target.querySelectorAll('option'));
    const items = options.filter((option) => (option.selected)).map((option) => (option.value));
    this.setState({ ...{ selectedItems: items } });
  }

  render() {
    const { details, renderDetails } = this.state;

    return (
      <div>
        {(details.id ? renderDetails : false) ? (
          <Form horizontal>
            {
              renderInputText(
                'title', 
                'Title', 
                details.title
              )(this.textHandler.bind(this))
            }
            {
              details.authors.map((author, idx) => {
                return (
                  <Jumbotron key={idx}>
                    {
                      renderInputText(
                        `authors[${idx}].name`, 
                        'Author name', 
                        author.name
                      )(this.textHandler.bind(this))
                    }
                    {
                      renderInputText(
                        `authors[${idx}].birth_year`, 
                        'Author birth year', 
                        author.birth_year
                      )(this.textHandler.bind(this))
                    }
                    {
                      renderInputText(
                        `authors[${idx}].death_year`,
                        'Author death year',
                        author.death_year
                      )(this.textHandler.bind(this))
                    }
                  </Jumbotron>
                );
              })
            }
            {details.bookshelves.map((bookshelve, idx) => {
              return (
                <Jumbotron key={idx}>
                  {
                    renderInputText(
                      `bookshelves[${idx}]`, 
                      'Bookshelve', 
                      bookshelve
                    )(this.textHandler.bind(this))
                  }
                </Jumbotron>
              );
            })}
            {
              renderInputNumber(
                'download_count', 
                'Download count', 
                details.download_count
              )(this.numberHandler.bind(this))
            }
            
            <Jumbotron>
              <FormGroup controlId="formControlsSelectMultiple">
                <Col sm={3}>
                  Formats
                </Col>
                <Col sm={7}>
                  <FormControl componentClass="select" multiple onChange={this.selectHandler.bind(this)} >
                    {Object.keys(details.formats).map((key, idx) => {
                      return <option key={key} value={key}>{`${key} - ${details.formats[key]}`}</option>;
                    })}
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={10}>
                  <Button type="submit" onClick={this.deleteFormatHandler.bind(this)}>
                    Delete selected
                  </Button>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={3}>
                  Format key
                </Col>
                <Col sm={7}>
                  <FormControl 
                    type="text"
                    inputRef={(ref) => {this.formatKeyInput = ref;}}
                    defaultValue=""
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={3}>
                  Format value
                </Col>
                <Col sm={7}>
                  <FormControl 
                    type="text"
                    inputRef={(ref) => {this.formatValueInput = ref;}}
                    defaultValue=""
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={10}>
                  <Button 
                    type="submit" 
                    onClick={this.addFormatHandler.bind(this)}
                  >
                    Add format
                  </Button>
                </Col>
              </FormGroup>
            </Jumbotron>
            <FormGroup>
              <Col sm={10}>
                <Button type="submit" onClick={this.submitHandler.bind(this)}>
                  Update
                </Button>
              </Col>
            </FormGroup>
          </Form>
        ) : ''}
      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Details;
