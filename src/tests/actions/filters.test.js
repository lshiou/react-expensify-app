import moment from 'moment';
import { setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount } from '../../actions/filters';


test('should setup setStartDate action object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0)
  });
});

test('should setup setEndDate action object', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(0)
  });
});

test('should setup setTextFilter action object with provided value', () => {
  const text = 'rent';
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text
  });
});

test('should setup setTextFilter action object with default value', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  });
});

test('should setup sortByDate action object', () => {
  // const action = sortByDate();
  // expect(action).toEqual({
  //   type: 'SORT_BY_DATE'
  // });
  expect(sortByDate()).toEqual({
    type: 'SORT_BY_DATE'
  });  
});


test('should setup sortByAmount action object', () => {
  // const action = sortByAmount();
  // expect(action).toEqual({
  //   type: 'SORT_BY_AMOUNT',
  // });
  expect(sortByAmount()).toEqual({
    type: 'SORT_BY_AMOUNT',
  });  
});
