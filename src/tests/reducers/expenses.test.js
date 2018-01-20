import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import uuid from 'uuid';
import moment from 'moment';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([ expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([ expenses[0], expenses[1], expenses[2]]);
});


test('should add expense', () => {
  const expense = {
    id: uuid(),
    description: 'test expense',
    note: '',
    amount: 5000,
    createdAt: moment()
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense
  };
  
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([ ...expenses, expense ]);
});

test('should edit expense', () => {
  const updates = {
    amount: 1000,
    description: 'override test description'
  };
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates
  };

  const state = expensesReducer(expenses, action);
  expect(state[1].description).toBe(updates.description);
  expect(state[1].amount).toBe(updates.amount);
});


test('should not edit expense if expense not found', () => {
  const updates = {
    amount: 1000,
    description: 'override test description'
  };
  const action = {
    type: 'EDIT_EXPENSE',
    id: 'laskjlaf',
    updates
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

