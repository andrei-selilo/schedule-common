import { DateRange } from '../../core/types/date-range';
import createState, { State } from '../../core/types/state';
import createPrice, { Price } from '../../core/types/price';
import createModel, { Model, ModelData } from '../../core/types/model';

export enum ScheduleState {
  DRAFT = 'draft',
  CREATED = 'created',
  SUBMITTED = 'submitted',
  COMPLETED = 'completed',
  FULFILLED = 'fulfilled',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export const ScheduleStateTransitions = {
  [ScheduleState.DRAFT]: [ScheduleState.CREATED],
  [ScheduleState.CREATED]: [ScheduleState.SUBMITTED, ScheduleState.CANCELLED],
  [ScheduleState.SUBMITTED]: [ScheduleState.COMPLETED, ScheduleState.CANCELLED],
  [ScheduleState.COMPLETED]: [ScheduleState.FULFILLED],
  [ScheduleState.FULFILLED]: [ScheduleState.REFUNDED],
};

type ScheduleBase = {
  customerId: string;
  providerId: string;

  datetime?: Date;
  // If reservedDates are not null - submit by provider required
  // Q: do i need to store this info after submit?
  reservedDates?: (Date | DateRange)[];

  price: Price;
};

export type Schedule = Model &
  ScheduleBase & {
    state: State<ScheduleState>;
  };

export type ScheduleData = ModelData &
  ScheduleBase & {
    state?: State<ScheduleState>;
  };

// Q: is || redundant? (made it for no additional method calls)
export default (data: ScheduleData): Schedule => ({
  ...createModel(data),
  ...data,
  state: createState(data.state || { value: ScheduleState.DRAFT }),
  price: createPrice(data.price),
});
