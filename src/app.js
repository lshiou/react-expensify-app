import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

// should keep app.js small, only in charge of bootstrapping thing
console.log('test!');

// setup store
const store = configureStore();

// watch the state changes
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log('visibleExpenses: ');
  console.log(visibleExpenses);
});


// set up provider with the store
const jsx = (  
  <Provider store={store}>
    <AppRouter /> 
  </Provider>
);
  
ReactDOM.render(jsx, document.getElementById('app'));

