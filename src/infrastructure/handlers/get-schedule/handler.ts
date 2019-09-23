import 'reflect-metadata';
import { Logger } from '../../../core/types/logger';
import { Schedule } from '../../../domain/models/schedule';
import createRepository from '../../../domain/repositories/schedule';
import createDataProvider from '../../data-providers/mongo/schedule';

type HandlerConfig = { secrets: any; logger: Logger; metrics?: any };
type Message = any;

export default ({ secrets, logger }: HandlerConfig) => async (
  message: Message
): Promise<Schedule | undefined> => {
  logger.log('GetScheduleHandler', 'invocation with', message);

  const dataProvider = await createDataProvider({
    secrets: secrets.db,
    logger,
  });
  const repository = createRepository({ dataProvider, logger });

  // TODO: move to Application layer (Command/Query)
  const schedule = await repository.get(message);

  return schedule;
};
