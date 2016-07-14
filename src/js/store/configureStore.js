import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const logger = createLogger();
const configureStore = (initialState = {})=> {
  const store =  createStore(
    rootReducer,
    initialState,
    applyMiddleware(logger)
  );
  return store;
};

export default configureStore;
