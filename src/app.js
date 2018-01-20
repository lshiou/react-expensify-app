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

// setup store
const store = configureStore();

// watch the state changes
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log('visibleExpenses: ');
  console.log(visibleExpenses);
});

// setTextFilter - bill (2 items) -> water (1 item)
// getVisibleExpenses -> print visible ones to screen

const expenseOne = store.dispatch(addExpense({ description: 'Water bill', amount: 4500}));
const expenseTwo = store.dispatch(addExpense({ description: 'Gas bill', amount: 300, createdAt: 1000 }));
const expenseThree = store.dispatch(addExpense({ description: 'Rent', amount: 109500}));


// store.dispatch(setTextFilter('bill'));

// store.dispatch(setTextFilter('water'));

// set up provider with the store
const jsx = (  
  <Provider store={store}>
    <AppRouter /> 
  </Provider>
);
  
ReactDOM.render(jsx, document.getElementById('app'));

