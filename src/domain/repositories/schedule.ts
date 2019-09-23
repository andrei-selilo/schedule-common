import { pipe } from 'ramda';
import { Repository } from '../../core/types/repository';
import { Aggregate } from '../../core/types/aggregate';
import { Schedule } from '../models/schedule';
import { Logger } from '../../core/types/logger';

type ScheduleRepositoryConfigData = {
  dataProvider: Repository<Aggregate<Schedule>>;
  logger: Logger;
};

export default ({ dataProvider, logger }: ScheduleRepositoryConfigData): Repository<Aggregate<Schedule>> => ({
  get: pipe(
    logger.f.log('ScheduleRepository', 'get', 'invocation with'),
    dataProvider.get,
    logger.f.log('ScheduleRepository', 'get', 'result'),
  ),
  save: pipe(
    logger.f.log('ScheduleRepository', 'save', 'invocation with'),
    dataProvider.save,
    logger.f.log('ScheduleRepository', 'save', 'result'),
  ),
  remove: pipe(
    logger.f.log('ScheduleRepository', 'remove', 'invocation with'),
    dataProvider.remove,
    logger.f.log('ScheduleRepository', 'remove', 'result'),
  ),
});
