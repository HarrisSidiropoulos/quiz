import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import {loadState, saveState} from './localStorage'
import throttle from 'lodash/throttle'

const configureStore = (initialState = {})=> {
  const store =  createStore(
    rootReducer,
    initialState
  );
  return store;
};

export default configureStore;
