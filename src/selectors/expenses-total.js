export default (expenses) => {
  return expenses
    .reduce((acc, curExpense) => (acc + curExpense.amount), 0 );
}