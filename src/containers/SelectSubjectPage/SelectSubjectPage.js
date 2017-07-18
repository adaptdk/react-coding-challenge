import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, routerShape } from 'react-router';
import * as subjectSelectionPageActions from '../../actions/selectSubjectPageActions';

import ValueSelector from '../../components/ValueSelector/index';

class SelectSubjectPage extends React.Component {

  constructor(){
    super();
    this.handleSubjectSelection = this.handleSubjectSelection.bind(this);
  }

  componentDidMount() {
    const { fetchSubjectList } = this.props.actions;
    fetchSubjectList();
  }

  handleSubjectSelection(fieldName, fieldValue){
    const { setSelectedSubject } = this.props.actions;
    this.props.router.push(`/books/${fieldValue}`);
    setSelectedSubject(fieldValue);
  }

  render() {

    const { subjectList, selectedSubject } = this.props;

    return (
      <div>
        <h2 className="text-center">
          Select a book subject
        </h2>
        <ValueSelector
          name="selectedSubject"
          value={selectedSubject || ''}
          onChoiceItemClick={this.handleSubjectSelection}
          choiceList={subjectList}
        />
      </div>
    );
  }
}

SelectSubjectPage.propTypes = {
  subjectList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  selectedSubject: PropTypes.string,
  actions: PropTypes.shape({
    fetchSubjectList: PropTypes.func.isRequired,
    setSelectedSubject: PropTypes.func.isRequired,
  }).isRequired,
  router: routerShape
};

function mapStateToProps({ mainRd }) {
  return {
    subjectList: mainRd.subjectList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(subjectSelectionPageActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withRouter(SelectSubjectPage)
);
