import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper;

/* 
code for building up every test can be refactored out
into beforeEach()
*/
beforeEach(() => {
  editExpense = jest.fn(); //spy
  removeExpense = jest.fn(); //spy
  history = { push: jest.fn() }; //object with a spy

  // ## passing props editExpense, removeExpense, expense just to setup test 
  wrapper = shallow(
    <EditExpensePage 
      editExpense={editExpense}  
      removeExpense={removeExpense} 
      history={history} 
      expense={expenses[1]} 
    />
  );
});

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  // onSubmit require passing an expense object argument
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]); 

  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
});

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click');  // instead of prop('onClick')()

  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(removeExpense).toHaveBeenLastCalledWith({ 
    id: expenses[1].id
  });
});
