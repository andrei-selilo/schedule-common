import createScheduleModel, { Schedule, ScheduleData } from '../models/schedule';
import createAggregate, { Aggregate, AggregateAction, addCommand, addDomainEvent, setModel } from '../../core/types/aggregate';
import createScheduleCreatedDomainEvent from '../events/schedule-created';
import { Command } from '../../core/types/command';

type createScheduleInput = {
  aggregate: Aggregate<Schedule>;
  command: Command;
  schedule: ScheduleData;
};
export const createSchedule: AggregateAction<Aggregate<Schedule>> = ({ command, schedule }: createScheduleInput): Aggregate<Schedule> => {
  let aggregate: Aggregate<Schedule> = createAggregate();

  // TODO: pipe
  aggregate = addCommand(aggregate, command);
  aggregate = setModel(aggregate, createScheduleModel(schedule));
  aggregate = addDomainEvent(aggregate, createScheduleCreatedDomainEvent());

  return aggregate;
};
