import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { ExpenseSummary } from '../../components/ExpenseSummary';

test('should render ExpenseSummary correctly', () => {
  const wrapper = shallow(<ExpenseSummary expenseCount={1} expensesTotal={9434} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummary correctly', () => {
  const wrapper = shallow(<ExpenseSummary expenseCount={2} expensesTotal={9434} />);
  expect(wrapper).toMatchSnapshot();
});

