import 'reflect-metadata';
import { HandlerConfig } from '../../../core/types/handler-config';
import { Message } from '../../../core/types/message';
import { Aggregate } from '../../../core/types/aggregate';
import { Schedule } from '../../../domain/models/schedule';
import createRepository from '../../../domain/repositories/schedule';
import createDataProvider from '../../data-providers/mongo/schedule';
// import createScheduleCreatedIntegrationEvent from '../../events/schedule-created';
import { createScheduleCommand, createScheduleCommandHandler } from '../../../application/commands/create-schedule';

// TODO: make declarative?
export default ({ secrets, publisher, logger }: HandlerConfig) => async (message: Message): Promise<Aggregate<Schedule>> => {
  logger.log('CreateScheduleHandler', 'invocation with', message);

  const dataProvider = await createDataProvider({ secrets: secrets.db, logger });
  const repository = createRepository({ dataProvider, logger });

  logger.log('CreateScheduleHandler', 'repository created');

  // TODO: convert message to CreateScheduleCommandData?
  const command = createScheduleCommand({ id: message.sourceId, data: message.payload });
  const commandHandler = createScheduleCommandHandler({
    repository,
    logger,
  });

  const aggregate = await commandHandler(command);

  // TODO: integration event should be created as a domain event reflection
  // await publisher(createScheduleCreatedIntegrationEvent(schedule));

  return aggregate;
};
