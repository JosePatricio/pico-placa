import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';


import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';


ReactDOM.render(
  <Provider store={store}>
  <App/>
</Provider>,
  document.getElementById('root')
);



