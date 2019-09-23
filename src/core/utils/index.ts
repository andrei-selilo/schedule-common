import { is, ifElse, __, tap, curry } from 'ramda';

// const compose = (...functions) => input => functions.reduceRight((chain, func) => chain.then(func), Promise.resolve(input));
const pipe = (...functions) => (input) =>
  functions.reduce((chain, func) => chain.then(func), Promise.resolve(input));
const log = (message) => tap((x) => console.log(message, x));

// ifNot :: (f -> boolean, f -> any) -> any
const ifNot = (predicate, func) => ifElse(predicate, (value) => value, func);

// isString :: s -> boolean
const isString = (value) => is(String, value);
// isArray :: s -> boolean
const isArray = (value) => is(Array, value);

// invalidParametersError :: * -> never
const invalidParametersError = () => {
  throw new Error('Invalid parameters');
};

const promiseAll = curry((fn, value) => Promise.all(fn(value)));

export {
  pipe,
  log,
  ifNot,
  isString,
  isArray,
  invalidParametersError,
  promiseAll,
};
