// export a stateless functional component
// desc, amount, createdAt
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

//import { removeExpense } from '../actions/expenses';

//const ExpenseListItem = ({ description, amount, createdAt, id, dispatch }) => (
const ExpenseListItem = ({ description, amount, createdAt, id }) => (  
  <div>    
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>
      {numeral(amount/100).format('$0,0.00')} 
      - 
      {moment(createdAt).format('MMMM Do, YYYY')}
    </p> 
    {/*
      <button 
      onClick={(e) => {
        dispatch(removeExpense({ id }));
      }}>
      Remove
      </button>
      <Link to={`/edit/${id}`}>Edit</Link>    
    */}
    
  </div>
);

// to use the dispatch, must use connect().  
// can omit the mapStateToProps func in the first call param if we don't need store state
//export default connect()(ExpenseListItem);

export default ExpenseListItem;