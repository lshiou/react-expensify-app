import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

// REMOVE expense
test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });

  // toBe can't be used to compare 2 objects, cos it means ===
  // expect(action).toBe({
  //   type: 'REMOVE_EXPENSE',
  //   id: '123abc'
  // });

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

// EDIT expense
test('should setup edit expense action object', () => {
  const action = editExpense('123abc', {
    amount: 200,
    note: 'test'
  });

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      amount: 200,
      note: 'test'
    }
  });
});

// ADD expense
test('should setup add expense action object with provided value', () => {
  const expenseData = {
    description: 'Rent',
    amount: 200,
    createdAt: 1000,
    note: "This was last month's rent"
  };

  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)  //## to accept any value of String type
    }
  });
});

// ADD expense with default
test('should setup add expense action object with default value', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),  //## to accept any value of String type
      description: '', 
      note: '', 
      amount: 0, 
      createdAt: 0
    }
  });
});