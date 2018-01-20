import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { addExpense } from '../actions/expenses';


// use class base component to avoid inline functions
export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    //this.props.onSubmit(expense);
    this.props.addExpense(expense);
    this.props.history.push('/');
  };

  render() {
    return  (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm 
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

// const AddExpensePage = (props) => (
//   <div>
//     <h1>Add Expense</h1>
//     <ExpenseForm 
//       onSubmit={(expense) => { 
//         console.log(expense);
//         //props.dispatch(addExpense(expense)); // addExpense is tricky to test, since it is imported

//         props.onSubmit(expense);  //achieve same effect as above commented code, but easier to test

//         //redirect back to dashboard page
//         props.history.push('/');
//       }}
//     />
//   </div>
// );

//export default AddExpensePage;

// this is used for simplifying the testing
// implict return the object
const mapDispatchToProps = (dispatch) => ({  
    // onSubmit: (expense) => dispatch(addExpense(expense))

    //better to name it with the same name as action generator
    addExpense: (expense) => dispatch(addExpense(expense))
});

//export default connect()(AddExpensePage);
export default connect(undefined, mapDispatchToProps)(AddExpensePage);