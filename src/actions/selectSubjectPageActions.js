import Api from '../api';

import actionTypes from './actionTypes';

export const fetchSubjectListSuccess = (subjectList) => {
  return {
    type: actionTypes.FETCH_SUBJECT_LIST_SUCCESS,
    subjectList,
  };
};

export const setSelectedSubject = (selectedSubject) => ({
  type: actionTypes.SUBJECT_SELECTED,
  selectedSubject,
});

export const fetchSubjectList = () => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_SUBJECT_LIST });
  return Api.GET('/subjects')
    .then((subjectList) => dispatch(fetchSubjectListSuccess(subjectList)));
};
