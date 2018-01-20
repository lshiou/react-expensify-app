import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
  <div>
    {
      props.expenses.length === 0 ? (
        <p>No expenses</p>
      ) : (
        props.expenses.map((item, idx) => {
          return (
            <ExpenseListItem {...item} key={idx} />
          )      
        })
      )
    }
  </div>
);

/*
  connect() return a function, not a componet.
  So need to call the function to return the component: connect()()

  connect(func)
  func 
  - determine what store data our component need to access
  - store state get passed in as first arg of func
  - return an object (any key value pair we like) that will be available as props
    to the component to be connected

  - as the state changes, this function will automatically get rerun

*/  
/*
const ConnectedExpenseList = connect((state) => {
  return {
    expenses: state.expenses
  }
})(ExpenseList);

export default ConnectedExpenseList;
*/

// more preferred convention, define a mapStateToProps function (map store state to props)
const mapStateToProps = (state) => {  
  return {
    expenses: selectExpenses(state.expenses, state.filters)
    // expenses: state.expenses,
    // filters: state.filters
  }
};

export default connect(mapStateToProps)(ExpenseList);