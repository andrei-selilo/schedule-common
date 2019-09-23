import { processEvent, createLogger, getSecrets, createMetrics, lambda } from '../../utils';
import createPublisherProvider from '../../utils/local/publisher';
import getHandler from './handler';
import localEvent from './event.local.json';

// TODO: implement cache?
(async (event): Promise<void> => {
  // TODO: use serializer for sanitizing
  const logger = createLogger();
  try {
    logger.log('Local', 'Invocation');

    const environment = 'local';
    const { parseEvent } = lambda;
    const deleteMessage = Promise.resolve;
    const publisherProvider = createPublisherProvider({ logger });
    const secrets = await getSecrets({ environment });
    const metrics = createMetrics({ secrets });

    const result = await processEvent({ parseEvent, deleteMessage, getHandler, publisherProvider, metrics, secrets, logger })(event);

    logger.log('Local', 'Finished', result);
  } catch (error) {
    logger.error('Local', 'Error', error);
  }
})(localEvent);
