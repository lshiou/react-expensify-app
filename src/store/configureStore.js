import { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

// this means when import configureStore, 
// it would create the store and available for use
export default () => {
  // Store creation
  // combineReducers() take an object with key value pairs (root state name, corresponding reducer)
  // reducers will be invoked when an action is dispatched  
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    
  );
  
  return store;
};

