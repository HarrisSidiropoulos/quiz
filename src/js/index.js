import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore'
import Root from './Root'

if (process.env.NODE_ENV==='production') {
  require('offline-plugin/runtime').install()
}

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
