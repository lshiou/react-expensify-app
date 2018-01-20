import { createStore } from 'redux';

// Action generators - func that return action objects

// use destructuring in the function parameter
// const add = ({ a, b }, c) => {
//   return a + b;
// };


// set default of param obj as empty object
// const incrementCount = (payload = {}) => ({
//   type: 'INCREMENT',
//   incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
// });

// use destructuring 
// set default of param.incrementBy as 1
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy
});

// setCount
const setCount = ({ count = 1 } = {}) => ({
  type: 'SET',
  count
});

// resetCount
const resetCount = () => ({
  type: 'RESET'
});

// Reducers
// 1. reducers are pure functions 
// - output only determined by input, not depends on and affect anything else
// 2. never change state or action

const countReducer = (state = { count: 0 }, action) => {
  // set default state as count: 0
  // this function will be invoked when an action is dispatched
  
  switch(action.type) {    
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
      return {
        count: state.count - decrementBy
      };
    case 'SET':
      return {
        count: action.count
      };
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state; 
  }
}

// pass a function to createStore
const store = createStore(countReducer);

console.log(store.getState());

// subscribe() return a func that can be called to unsubscribe the watch
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 5
// });

store.dispatch(incrementCount({ incrementBy: 5 }));

//unsubscribe();

store.dispatch(resetCount());

store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 10}));

store.dispatch(setCount({ count: 100 }));

console.log(store.getState()); // return current state