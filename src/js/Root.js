import React from 'react';
import { Provider } from 'react-redux'
import Game from './components'

const Root = ({store})=> (
  <Provider store={store}>
    <Game />
  </Provider>
);

export default Root
