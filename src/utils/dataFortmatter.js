import moment from 'moment';

export function timeConverter(UNIX_timestamp) {
  let tmp = new Date(UNIX_timestamp * 1000);
  const result = moment(tmp).format('MMMM DD, YYYY');
  return `Published on ${result}`;
}

export function hourConverter(UNIX_timestamp) {
  let tmp = new Date(UNIX_timestamp * 1000);
  let hour = tmp.getHours();
  return hour;
}
