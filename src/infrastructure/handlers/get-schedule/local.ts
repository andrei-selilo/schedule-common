import { pipe, map } from 'ramda';
import getHandler from './handler';
import { promiseAll } from '../../../core/utils';
import {
  createLogger,
  getSecrets,
  createMetrics,
  lambda,
} from '../../../infrastructure/utils';
import event from './event.local.json';

(async (event) => {
  const environment = 'local';

  const logger = createLogger();
  const secrets = await getSecrets({ environment });
  const metrics = createMetrics({ secrets });

  const handleMessage = getHandler({ secrets, logger, metrics });

  const result = await pipe(
    logger.f.log('Local', 'invocation with', { environment }),
    lambda.parseEvent,
    promiseAll(map(handleMessage)),
    logger.f.log('Local', 'result') // TODO: test, i doubt it works (R.then is not acceptable?)
  )(event);

  console.log(result); // TODO: remove after tesing
})(event);
