import createModel, { Model, ModelData } from '../../core/types/model';
import createState, { State } from '../../core/types/state';

export enum TransactionType {
  AUTHORIZATION = 'authorization',
  AUTHORIZATION_CANCELLATION = 'authorization-cancellation',
  CAPTURE = 'capture',
}

export enum TransactionState {
  PENDING = 'pending',
  FAILED = 'failed',
  SUCCEEDED = 'succeeded',
}

export type TransactionBase = {
  id: string; // required?
  type: TransactionType;

  createdAt: Date;
  updatedAt?: Date;
};

export type Transaction = Model &
  TransactionBase & {
    state: State<TransactionState>;
  };

export type TransactionData = ModelData &
  TransactionBase & {
    state?: State<TransactionState>;
  };

export default (data: TransactionData): Transaction => ({
  ...createModel(data),
  ...data,
  state: createState(data.state || { state: TransactionState.PENDING }),
});
