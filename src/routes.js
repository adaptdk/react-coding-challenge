import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './components/App';

import SelectSubjectPage from './containers/SelectSubjectPage/SelectSubjectPage';
import BookSelectionPage from './containers/BookSelectionPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SelectSubjectPage}/>
    <Route path="/books(/:bookSubject)" component={BookSelectionPage}/>
  </Route>
);
