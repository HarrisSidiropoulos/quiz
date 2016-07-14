import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore'
import Root from './Root'
// import {install as offlineInstall} from 'offline-plugin/runtime'

const store = configureStore();

// offlineInstall()

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
