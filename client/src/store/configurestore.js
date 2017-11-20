import rootReducer from '../reducers/rootreducer.js';
import {createStore} from 'redux';

/*export default (initialState) => {
  return createStore(rootReducer, initialState);
};*/

export default () => {
  return createStore(rootReducer);
};