import { combineReducers } from 'redux';

import mainRd from './mainRd';

import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  mainRd,
  routing: routerReducer
});

export default rootReducer;
