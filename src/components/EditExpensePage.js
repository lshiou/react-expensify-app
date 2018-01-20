import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

// setup mapDispatchToProps editExpense and removeExpense

// use class base component to avoid inline functions
export class EditExpensePage extends React.Component {

  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };  

  onClick = (e) => {
    this.props.removeExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  };

  render() {
    return  (
      <div>
        {/*
          edit expense with id of {props.match.params.id}
        */}      
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button 
          onClick={this.onClick}
        >
          Remove Expense
        </button>          
      </div>
    );
  }
}



//props here is passed by the higher order component (the one we export at end of file)
// const EditExpensePage = (props) => {
//   //console.log(props);
//   return (
//     <div>
//       {/*
//         edit expense with id of {props.match.params.id}
//       */}      
//       <ExpenseForm
//         expense={props.expense}
//         onSubmit={(expense) => {
//           // dispatch the action to edit expense
//           // redirect to dashboard page
//           props.dispatch(editExpense(props.expense.id, expense));
//           props.history.push('/');
//           console.log('updated', expense);
//         }}
//       />
//       <button 
//         onClick={(e) => {
//           props.dispatch(removeExpense({ id: props.expense.id }));
//           props.history.push('/');
//         }}
//       >
//         Remove Expense
//       </button>          
//     </div>
//   );
// };

// this is used for simplifying the testing
// implict return the object
const mapDispatchToProps = (dispatch, props) => ({
  //better to name it with the same name as action generator
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: (data) => dispatch(removeExpense(data))
});


// need to connect to redux store to access the expense list

//export default EditExpensePage;

// this function also have access to props as 2nd argument
const mapStateToProps = (state, props) => ({
  // find() search through an array to look for a single item 
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

// export default connect(mapStateToProps)(EditExpensePage);
export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
