import {
  pipe,
  ifNot,
  isString,
  isArray,
  invalidParametersError,
  log,
} from '../../../core/utils';
import parseMessage from '../../../core/utils/parse-message';

// requestSchedule :: string -> Promise<Schedule>
// const requestSchedule = (id) => fetch(`https://localhost/schedules/${id}`).then(res => res.json())
const requestSchedule = (id) =>
  Promise.resolve({ id, state: 'open', date: new Date() });

// mapToSchedule :: object | object[] -> Schedule
const mapToSchedule = pipe(
  ifNot(isArray, (value) => [value]),
  (value) => value
);

// getSchedule :: string -> Promise<Schedule>
const getSchedule = pipe(
  log('getSchedule invocation with'),
  ifNot(isString, invalidParametersError),
  requestSchedule,
  mapToSchedule
);

export default pipe(parseMessage, getSchedule);
