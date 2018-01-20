
const moment = require.requireActual('moment');
// can't do import moment from 'moment'

export default (timestamp = 0) => {
  return moment(timestamp);
};