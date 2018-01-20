import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let addExpense, history, wrapper;

/* 
code for building up every test can be refactored out
into beforeEach()
*/
beforeEach(() => {
  addExpense = jest.fn(); //spy
  history = { push: jest.fn() }; //object with a spy
  //wrapper = shallow(<AddExpensePage onSubmit={onSubmit} history={history} />);
  wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
});

test('should render AddExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  // onSubmit require passing an expense object argument
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]); 

  expect(history.push).toHaveBeenLastCalledWith('/');
  //expect(onSubmit).toHaveBeenLastCalledWith(expenses[1]);
  expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});


