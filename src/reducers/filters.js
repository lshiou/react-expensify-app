import moment from 'moment';

//
// Reducers
// 

// filters reducer

// default state
const filtersReducerDefaultState = {
  text: "",
  sortBy: 'date',
  startDate: moment().startOf('month'),  // start of current month
  endDate: moment().endOf('month')  // end of current month
  //startDate: undefined
  //endDate: undefined
};

// default export 
//const filtersReducer = (state = filtersReducerDefaultState, action) => {
export default (state = filtersReducerDefaultState, action) => {  
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