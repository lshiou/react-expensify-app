//
// Reducers
// 

// expense reducer
const expensesReducerDefaultState = [];

//const expensesReducer = (state = expensesReducerDefaultState, action) => {

// default export without using the const variable
export default (state = expensesReducerDefaultState, action) => {  
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

// export default expensesReducer;