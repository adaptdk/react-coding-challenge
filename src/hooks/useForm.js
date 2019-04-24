import { useReducer } from 'react';
import { getArrayGroup, getArrayIndex } from '../helpers/form';

import {
  API_URL,
  BOOKS_ENDPOINT,
  UPDATE_FIELD_ACTION,
  UPDATE_ARRAY_ACTION,
} from '../../project.config';

const formReducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case UPDATE_FIELD_ACTION:
      return { ...state, [action.name]: action.value };
    case UPDATE_ARRAY_ACTION:
      return { ...state, [action.group]: action.elements };
    default:
      throw new Error();
  }
};

const useForm = (state, refetch) => {
  const [form, dispatch] = useReducer(formReducer, state);

  const handleChange = (event) => {
    const { name, value } = event.target;

    dispatch({ type: UPDATE_FIELD_ACTION, name, value });
  };

  const handleCollectionChange = (event) => {
    const { name, value } = event.target;

    // Extract array name and element index from target name
    // This form handling is custom and could be improved
    const group = getArrayGroup(name);
    const index = getArrayIndex(name);

    const elements = form[group];

    elements[index] = value;

    dispatch({ type: UPDATE_ARRAY_ACTION, group, elements });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { target: { id } } = event;

    fetch(`${API_URL}/${BOOKS_ENDPOINT}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => refetch())
      // Error handling should be visible to the user
      // eslint-disable-next-line no-console
      .catch(error => console.log(error));
  };

  return {
    handleChange,
    handleCollectionChange,
    handleSubmit,
  };
};

export default useForm;
