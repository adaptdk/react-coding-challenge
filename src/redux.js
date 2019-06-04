import {
    createStore,
    applyMiddleware
  } from 'redux';
  import thunk from 'redux-thunk';
  import axios from "axios";
  import {
    composeWithDevTools
  } from 'redux-devtools-extension';
  
  
  const initialState = {
    pending: false,
    subjects: [],
    error: null,
    fiction: [],
    science: [],
    fictionBooks: [],
    currentSubject: "",
    currentBooks: []
  }
  const reducer = (state = initialState, action) => {
    const updatedState = {
      ...state
    };
    switch (action.type) {
      case "FETCH_SUBJECTS_PENDING":
        updatedState.pending = state.pending = true;
        console.log("updatedState", updatedState);
        return updatedState;
      case "FETCH_SUBJECTS_SUCCESS":
        updatedState.pending = state.pending = false;
        updatedState.subjects = action.payload;
        console.log("updatedState", updatedState);
        return updatedState;
      case "FETCH_SUBJECTS_ERROR":
        updatedState.pending = state.pending = false;
        updatedState.error = state.error = action.error;
        return updatedState;
      case "FETCH_BOOKS_ERROR":
        updatedState.pending = state.pending = false;
        updatedState.error = state.error = action.error;
        return updatedState;
      case "FETCH_BOOKS_SUCCESS":
        console.log("action.payload", action.payload);
        updatedState.currentBooks = action.payload.data;
        updatedState.currentSubject = action.payload.subject;
        console.log("updatedState:", updatedState);
        return updatedState;
      default:
        return state;
    }
  }
  
  export function fetchingSubjectsPending() {
    return {
      type: "FETCH_SUBJECTS_PENDING"
    }
  }
  export function fetchSubjectsError(error) {
    return {
      type: "FETCH_SUBJECTS_ERROR",
      error: error
    }
  }
  
  export function fetchingSubjects() {
    return (dispatch) => {
      dispatch(fetchingSubjectsPending());
      axios.get('http://localhost:3010/subjects')
        .then((response) => {
          dispatch({
            type: "FETCH_SUBJECTS_SUCCESS",
            payload: response.data
          });
        })
        .catch((err) => {
          dispatch({
            type: "FETCH_SUBJECTS_ERROR",
            payload: err
          })
        })
    }
  }
  
  export function fetchBooks(subjectToFetch) {
    return (dispatch) => {
      axios.get('http://localhost:3010/books?subjects_like=' + subjectToFetch)
        .then((response) => {       
          dispatch({
            type: "FETCH_BOOKS_SUCCESS",
            payload: {data: response.data, subject: subjectToFetch}
          });
        })
        .catch((err) => {
          console.log("error", err); 
          dispatch({
            type: "FETCH_BOOKS_ERROR",
            payload: err
          })
        })
    }
  }
  
  export function fetchingFiction() {
    return (dispatch) => {
      axios.get('http://localhost:3010/books')
        .then((response) => {
          let fictionTitels = []
          let fictionTitelsData = []
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].subjects.find(function (name) {
                return name === "Fiction";
              })) {
              fictionTitels.push(response.data[i].title);
              fictionTitelsData.push(response.data[i])
            }
          }
          dispatch({
            type: "FETCH_FICTION_SUCCESS",
            payload: fictionTitels,
            secondpayload: fictionTitelsData,
          });
        })
        .catch((err) => {
          dispatch({
            type: "FETCH_SUBJECTS_ERROR",
            payload: err
          })
        })
    }
  }
  export function fetchingScience() {
    return (dispatch) => {
      axios.get('http://localhost:3010/books')
        .then((response) => {
          let scienceTitels = []
          let scienceTitelsData = []
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].subjects.find(function (name) {
                return name === "Science";
              })) {
              scienceTitels.push(response.data[i].title);
              scienceTitelsData.push(response.data[i]);
            }
          }
          dispatch({
            type: "FETCH_SCIENCE_SUCCESS",
            payload: scienceTitels,
            secondpayload: scienceTitelsData,
          });
        })
        .catch((err) => {
          dispatch({
            type: "FETCH_SUBJECTS_ERROR",
            payload: err
          })
        })
    }
  }
  
  export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));