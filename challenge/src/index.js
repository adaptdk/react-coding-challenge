import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from 'serviceWorker';
import App from 'components/app/App';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
