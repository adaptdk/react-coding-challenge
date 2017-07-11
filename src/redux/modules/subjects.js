import { API_ROOT } from '../../utils/constants';

// Actions
const REQUEST_SUBJECTS = 'rcc/subjects/REQUEST_SUBJECTS';
const RECEIVE_SUBJECTS = 'rcc/subjects/RECEIVE_SUBJECTS';
const SELECT_SUBJECTS = 'rcc/subjects/SELECT_SUBJECTS';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case REQUEST_SUBJECTS:
    case RECEIVE_SUBJECTS:
      return {
        ...state,
        all: action.all,
      };
    case SELECT_SUBJECTS:
      return {
        ...state,
        selected: action.selected,
      };
    default:
      return state;
  }
}

// Action Creators
export const selectSubjects = (selected) => ({
  type: SELECT_SUBJECTS,
  selected,
});

const requestSubjects = () => ({ type: REQUEST_SUBJECTS });

export const receiveSubjects = (all) => {
  return {
    type: RECEIVE_SUBJECTS,
    all,
  };
};

export const fetchSubjects = () => (dispatch) => {
  dispatch(requestSubjects());
  return fetch(`${API_ROOT}/subjects`)
    .then((response) => response.json())
    .then((subjects) => dispatch(receiveSubjects(subjects)));
};
