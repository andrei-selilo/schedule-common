import createModel, { Model, ModelData } from '../../core/types/model';
import createState, { State } from '../../core/types/state';
import { Transaction } from './transaction';

// TODO: move payment data to separate service

export enum PaymentType {
  CASH = 'cash',
  CARD = 'card',
}

export enum PaymentState {
  DRAFT = 'draft',
  AUTHORISE_IN_PROGRESS = 'authorise-in-progress',
  AUTHORISED = 'authorised',
  AUTHORISE_FAILED = 'authorise-failed',
  CAPTURE_IN_PROGRESS = 'capture-in-progress',
  CAPTURED = 'captured',
  CAPTURE_FAILED = 'capture-failed',
  CANCEL_IN_PROGRESS = 'cancel-in-progress',
  CANCELLED = 'cancelled',
  CANCEL_FAILED = 'cancel-failed',
  REFUND_IN_PROGRESS = 'refund-in-progress',
  REFUNDED = 'refunded',
  REFUND_FAILED = 'refund-failed',
}

export const PaymentStateTransitions = {
  [PaymentState.DRAFT]: [PaymentState.AUTHORISE_IN_PROGRESS],
  [PaymentState.AUTHORISE_IN_PROGRESS]: [PaymentState.AUTHORISED, PaymentState.AUTHORISE_FAILED],
  [PaymentState.AUTHORISED]: [PaymentState.CAPTURE_IN_PROGRESS, PaymentState.CANCEL_IN_PROGRESS],
  [PaymentState.CAPTURE_IN_PROGRESS]: [PaymentState.CAPTURED, PaymentState.CAPTURE_FAILED],
  [PaymentState.CAPTURED]: [PaymentState.REFUND_IN_PROGRESS],
  [PaymentState.REFUND_IN_PROGRESS]: [PaymentState.REFUNDED, PaymentState.REFUND_FAILED],
};

type PaymentBase = {
  type: PaymentType;

  transactions?: Transaction[];
};

export type Payment = Model &
  PaymentBase & {
    state: State<PaymentState>;
  };

export type PaymentData = ModelData &
  PaymentBase & {
    state?: State<PaymentState>;
  };

// Q: is || redundant? (made it for no additional method calls)
export default (data: Payment): Payment => ({
  ...createModel(data),
  ...data,
  state: createState(data.state || { state: PaymentState.DRAFT }),
  type: data.type || PaymentType.CARD,
});
