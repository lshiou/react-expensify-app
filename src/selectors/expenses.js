import moment from 'moment';

// Get visible expenses
// destructure the second parameter
//const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {

// return the filtered and sorted array
// export default
export default (expenses, { text, sortBy, startDate, endDate }) => {
  //console.log('sortBy: ' + sortBy);
  return expenses.filter((expense) => {
    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true ;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true ;

    //const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;    
    //const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = typeof text !== 'string' || 
        expense.description.toLowerCase().includes(text.toLowerCase());
        //expense.description.toLowerCase().indexOf(text.toLowerCase()) >= 0;

    // only return when all matches are true
    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b)=> {
    if (sortBy === 'date') {
      // most recent at top
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount') {
      // most expensive at top
      return a.amount < b.amount ? 1 : -1;
    }    
  });
};