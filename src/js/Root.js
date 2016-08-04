import React from 'react';
import { Provider } from 'react-redux'
import Home from './components/home'
import Quiz from './components/quiz'
import Template from './components'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

const Root = ({store})=> (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Template}>
        <IndexRoute component={Home}/>
        <Route path="quiz">
          <IndexRoute component={Quiz}/>
        </Route>
      </Route>
    </Router>
  </Provider>
);

export default Root
