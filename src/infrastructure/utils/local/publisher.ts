import { Publisher } from '../../../core/types/publisher';
import { IntegrationEvent } from '../../../core/types/event';
import { Logger } from '../../../core/types/logger';

export default ({ logger }: { logger: Logger }): Publisher => async (event: IntegrationEvent): Promise<void> => {
  logger.log('LocalPublisher', 'invocation with IntegrationEvent', event);
};
