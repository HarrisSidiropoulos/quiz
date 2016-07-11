import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const configureStore = (initialState = {})=> {
  const store =  createStore(
    rootReducer,
    initialState
  );
  return store;
};

export default configureStore;
