import { EntityManager } from 'typeorm';
import { Repository } from '../../../core/types/repository';
import { Logger } from '../../../core/types/logger';
import createAggregate, { Aggregate } from '../../../core/types/aggregate';
import { Schedule } from '../../../domain/models/schedule';
import { ScheduleEntity } from './config/entities/schedule';
import getDBConnection from './config/get-connection';

type ScheduleDataProviderData = {
  logger: Logger;
  secrets: any;
};
type ScheduleDataProviderMethodData = {
  logger: Logger;
  manager: EntityManager;
};

const get = ({ manager, logger }: ScheduleDataProviderMethodData) => async (query: {
  id: string;
  key: string;
}): Promise<Aggregate<Schedule> | undefined> => {
  logger.log('ScheduleDataProvider', 'get', 'invocation with query', query);
  const scheduleEntity = await manager.findOne(ScheduleEntity, {
    where: { ...query },
  }); // TODO: test!
  logger.log('ScheduleDataProvider', 'get', 'result', scheduleEntity);

  return scheduleEntity ? createAggregate({ model: scheduleEntity.toSchedule(), commands: scheduleEntity.commands }) : undefined;
};

const save = ({ manager, logger }: ScheduleDataProviderMethodData) => async (
  aggregate: Aggregate<Schedule>,
): Promise<Aggregate<Schedule>> => {
  logger.log('ScheduleDataProvider', 'save', 'invocation with entity', aggregate);
  const scheduleEntity = await manager.save(ScheduleEntity.createFromScheduleAggregate(aggregate));
  logger.log('ScheduleDataProvider', 'save', 'result', scheduleEntity);

  return createAggregate({ model: scheduleEntity.toSchedule(), commands: scheduleEntity.commands });
};
const remove = ({ manager, logger }: ScheduleDataProviderMethodData) => async (
  aggregate: Aggregate<Schedule>,
): Promise<Aggregate<Schedule>> => {
  logger.log('ScheduleDataProvider', 'remove', 'invocation with entity', aggregate);
  const scheduleEntity = await manager.remove(ScheduleEntity.createFromScheduleAggregate(aggregate));
  logger.log('ScheduleDataProvider', 'remove', 'result', scheduleEntity);

  return createAggregate({ model: scheduleEntity.toSchedule(), commands: scheduleEntity.commands });
};

// TODO: should repository creation should be sync?
// every call should create connection?
// memoize connection?
export default async ({ secrets, logger }: ScheduleDataProviderData): Promise<Repository<Aggregate<Schedule>>> => {
  logger.log('ScheduleDataProvider', 'creation invocation');
  const { manager } = await getDBConnection(secrets);
  logger.log('ScheduleDataProvider', 'creation invocation');
  const config = { manager, logger };

  return {
    get: get(config),
    save: save(config),
    remove: remove(config),
  };
};
