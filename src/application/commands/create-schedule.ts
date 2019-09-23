import createCommand, { Command, CommandData } from 'src/core/types/command';
import { Aggregate } from '../../core/types/aggregate';
import { Schedule, ScheduleData } from '../../domain/models/schedule';
import { Repository } from '../../core/types/repository';
import { Logger } from '../../core/types/logger';
import { createSchedule } from '../../domain/aggregates/schedule';

type CreateScheduleCommandBase = {
  data: ScheduleData;
};
export type CreateScheduleCommand = Command & CreateScheduleCommandBase;
export type CreateScheduleCommandData = CommandData & CreateScheduleCommandBase;

type CreateScheduleCommandHandlerConfig = {
  repository: Repository<Aggregate<Schedule>>;
  logger: Logger;
};
export const createScheduleCommand = (input: CreateScheduleCommandData): CreateScheduleCommand => ({
  ...createCommand({ id: input.id, createdAt: input.createdAt }),
  data: input.data,
});

export const createScheduleCommandHandler = ({ repository, logger }: CreateScheduleCommandHandlerConfig) => async (
  command: CreateScheduleCommand,
): Promise<Aggregate<Schedule>> => {
  logger.log('CreateScheduleCommandHandler', 'invocation with', command);

  const aggregate = createSchedule({ command });
  logger.log('CreateScheduleCommandHandler', 'created schedule aggregate', aggregate);

  return repository.save(aggregate);
};
