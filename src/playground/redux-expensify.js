import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//
// Action generators - return action objects
//

// ADD_EXPENSE
// destructuring with default property values
const addExpense = (
  { 
    description = '', 
    note = '', 
    amount = 0, 
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});


// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});


// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE'  
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'  
});

// SET_START_DATE
const setStartDate = (startDate) => ({
  type: 'SET_START_DATE' ,
  startDate
});

// SET_END_DATE
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE' ,
  endDate
});


//
// Reducers
// 

// expense reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch(action.type) {
    case 'ADD_EXPENSE':
      //return state.concat(action.expense);
      return [
        ...state, 
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      //return state.filter((item) => item.id !== action.id);
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            // use all the existing property of expense object
            ...expense,

            // override with properties from action.updates
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default: 
      return state;
  }
};

// filters reducer
const filtersReducerDefaultState = {
  text: "",
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch(action.type) {
    case 'SET_TEXT_FILTER':
      // return a new object, with all values of current state, with overriding text
      return {
        ...state,
        text: action.text
      };

    case 'SORT_BY_DATE':
      // return a new object, with all values of current state, with overriding properties
      return {
        ...state,
        sortBy: 'date'
      };

    case 'SORT_BY_AMOUNT':
      // return a new object, with all values of current state, with overriding properties
      return {
        ...state,
        sortBy: 'amount'
      };

    case 'SET_START_DATE':
      // return a new object, with all values of current state, with overriding properties
      return {
        ...state,
        startDate: action.startDate
      };      

    case 'SET_END_DATE':
      // return a new object, with all values of current state, with overriding properties
      return {
        ...state,
        endDate: action.endDate
      };      
      
    default: 
      return state;
  }  
};


// Get visible expenses
// destructure the second parameter
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  console.log('sortBy: ' + sortBy);
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = typeof text !== 'string' || 
        expense.description.toLowerCase().includes(text.toLowerCase());
        //expense.description.toLowerCase().indexOf(text.toLowerCase()) >= 0;

    // only return when all matches are true
    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b)=> {
    if (sortBy === 'date') {
      // most recent at top
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount') {
      // most expensive at top
      return a.amount < b.amount ? 1 : -1;
    }    
  });
};


// Store creation
// combineReducers() take an object with key value pairs (root state name, corresponding reducer)
// reducers will be invoked when an action is dispatched
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

// watch the state changes
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log('visibleExpenses: ');
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -21000 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 }));

// store.dispatch(removeExpense({
//   id: expenseOne.expense.id
// }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('ent'));
// store.dispatch(setTextFilter());

 store.dispatch(sortByAmount()); // amount
// store.dispatch(sortByDate());   // date

//  store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
//  store.dispatch(setEndDate(999));


console.log(store.getState());


const demoState = {
  expenses: [{
    id: 'poisfjakslf',
    description: 'Jan rent',
    note: 'this was the final payment',
    amount: 54500,
    createdAt: 0
  }],

  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};



// const user = {
//   name: 'Jen',
//   age: 24
// };

// // user age will override the preceding age 
// console.log({
//   age: 27,
//   ...user,
//   location: 'Philadelphia',  
// });