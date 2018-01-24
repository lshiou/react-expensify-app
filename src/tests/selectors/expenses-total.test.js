// create expense-total.js and expenses-total.js

import moment from 'moment';
import getExpensesTotal from '../../selectors/expenses-total.js';

const expenses = [{
  id: '1',
  description: 'Gum',
  note: '',
  amount: 195,
  createdAt: 0
}, {
  id: '2',
  description: 'Rent',
  note: '',
  amount: 109500,
  createdAt: moment(0).subtract(4, 'days').valueOf() //need number, so use valueOf to return timestamp in number
}, {
  id: '3',
  description: 'Credit Card',
  note: '',
  amount: 4500,
  createdAt: moment(0).add(4, 'days').valueOf()
}];

const total = getExpensesTotal(expenses);
console.log(total);

// tests

test('should return 0 if no expense', () => {
  const result = getExpensesTotal([]);
  expect(result).toBe(0);
});

test('should correctly add up a single expense', () => {
  const result = getExpensesTotal([expenses[0]]);
  expect(result).toBe(195);
});

// should correctly add up multiple expenses
test('should correctly add up a single expense', () => {
  const result = getExpensesTotal(expenses);
  expect(result).toBe(114195);
});

