import { pipe, map } from 'ramda';
import getHandler from './handler';
import { promiseAll } from '../../../core/utils';
import {
  createLogger,
  getSecrets,
  createMetrics,
  lambda,
} from '../../../infrastructure/utils';

type Message = any;

/**
 * Generates handler with cached config for AWS Lambda
 * TODO: test if async => async (message) works
 */
const generateHandler = async (): Promise<(message: Message) => unknown> => {
  const environment = 'development';

  const logger = createLogger();
  const secrets = await getSecrets({ environment });
  const metrics = createMetrics({ secrets });

  const handleMessage = getHandler({ secrets, logger, metrics });

  return pipe(
    logger.f.log('Lambda', 'invocation with', { environment }),
    lambda.parseEvent,
    promiseAll(map(handleMessage)),
    logger.f.log('Lambda', 'result') // TODO: test, i doubt it works (then fn is not acceptable?)
  );
};

export const handler = generateHandler();
