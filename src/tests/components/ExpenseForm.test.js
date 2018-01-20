import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();

  // find the form, then simulate submit
  // this would result in TypeError, e is undefined in e.preventDefault() in onSubmit()
  // wrapper.find('form').simulate('submit');
  
  // pass a second argument to simulate as the input argument for onSubmit(),
  // so that e.preventDefault can be properly mocked and resolved.
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });

  // fetch state from enzyme
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
  const value = 'new description';
  const wrapper = shallow(<ExpenseForm />);

  // find the first input
  // airbnb.io/enzyme/docs/api/ShallowWrapper/at.html

  // simulate the change event.  need to provide target.value
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
  const value = 'new note';
  const wrapper = shallow(<ExpenseForm />);

  // simulate the change event.  need to provide target.value
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
  const value = '23.50';
  const wrapper = shallow(<ExpenseForm />);

  // simulate the change event.  need to provide target.value
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
  const value = '23.122';
  const wrapper = shallow(<ExpenseForm />);

  // simulate the change event.  need to provide target.value
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe('');
});


test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  // onSubmitSpy('andrew');
  // expect(onSubmitSpy).toHaveBeenCalledWith('andrew', 'Philadelphia');

  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });

  // assertions
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);

  // find the singleDatePicker, execute the handler specified in a prop
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);  
  expect(wrapper.state('createdAt')).toEqual(now);
});

// 

test('should set calendar focus on change', () => {
  const wrapper = shallow(<ExpenseForm />);

  // find the singleDatePicker, then execute the focus changed handler 
  wrapper.find('SingleDatePicker').prop('onFocusChange')({
    focused: true
  });  
  expect(wrapper.state('calendarFocused')).toBe(true);
});


