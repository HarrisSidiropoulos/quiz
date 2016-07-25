import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore'
import Root from './Root'

if (process.env.NODE_ENV==='production') {
  const {install, applyUpdate} = require('offline-plugin/runtime')
  install({
    onInstalled() {
      console.log("onInstalled")
    },
    onUpdating() {
      console.log("onUpdating")
    },
    onUpdateReady() {
      console.log("onUpdateReady")
      // applyUpdate()
    },
    onUpdateFailed() {
      console.log("onUpdateFailed")
    },
    onUpdated() {
      console.log("onUpdated")
      // window.location.reload()
    }
  })
}

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
