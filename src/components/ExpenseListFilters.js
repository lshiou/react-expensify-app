import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';


// switch to class based component for using the component state
// export the unconnected class to facilitate testing
export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null // string value to indicate if first or second is focused
  };

  // called by the react-dates library, passed with an obj with startDate and endDate
  onDatesChange = ({ startDate, endDate }) => {
    // dispatch action to get filter to change
    // this.props.dispatch(setStartDate(startDate));
    // this.props.dispatch(setEndDate(endDate));
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
    
  };

  //calendarFocused is 'startDate' or 'endDate'
  onFocusChange = (calendarFocused) => {
    this.setState(()=> ({ calendarFocused }));
  };

  /*
    optional props for date range picker:
    showClearDates={true}
    numberOfMonths={1}
    isOutsideRange={() => false }   // enable picking date that is in the past
  */  

  // refactor out the dispatch method
  onTextChange = (e) => {
    console.log(e.target.value);
    // this.props.dispatch(setTextFilter(e.target.value));
    this.props.setTextFilter(e.target.value);
  };

  onSortChange = (e) => {
    if (e.target.value === 'date') {
      // this.props.dispatch(sortByDate());
      this.props.sortByDate();
    } else {
      // this.props.dispatch(sortByAmount());
      this.props.sortByAmount();
    }
  };

  render() {
    return (
      <div>
        <input 
          type="text" 
          value={this.props.filters.text} 
          onChange={this.onTextChange} 
        />
        <select 
          value={this.props.filters.sortBy} 
          onChange={this.onSortChange}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          showClearDates={true}
          numberOfMonths={1}
          isOutsideRange={() => false }
        />
      </div>  
    )
  }
}

/*
const ExpenseListFilters = (props) => (
  <div>
    <input 
      type="text" 
      value={props.filters.text} 
      onChange={(e) => {
        console.log(e.target.value);
        // need to update redux store here
        props.dispatch(setTextFilter(e.target.value));
      }} 
    />
    <select 
      value={props.filters.sortBy} 
      onChange={(e) => {
        if (e.target.value === 'date') {
          props.dispatch(sortByDate());
        } else {
          props.dispatch(sortByAmount());
        }        
      }}
    >
      <option value="date">Date</option>
      <option value="amount">Amount</option>
    </select>
  </div>
);
*/


const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

// for getting the dispatch calls into props
const mapDispatchToProps = (dispatch) => ({  
  setTextFilter: (value) => dispatch(setTextFilter(value)),
  sortByDate: () =>  dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps)(ExpenseListFilters);