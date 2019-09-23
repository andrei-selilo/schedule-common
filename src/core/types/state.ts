export type StateHistory<T> = {
  [valueFrom: string]: {
    valueTo: T;
    transitionedAt: Date;
    reason?: string;
  };
};

export type State<T> = {
  value: T;
  history?: StateHistory<T>[];
};

export default <T>(data: State<T>): State<T> => data;
