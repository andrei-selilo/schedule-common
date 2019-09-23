import { pipe } from 'ramda';
import { IntegrationEvent } from './event';
import { Logger } from './logger';

export type Publisher = (event: IntegrationEvent) => Promise<void>;
type PublisherConfig = { provider: Publisher; logger: Logger };

export default ({ provider, logger }: PublisherConfig): Publisher =>
  pipe(logger.f.log('Publisher', 'invocation with event'), provider, logger.f.log('Publisher', 'event has been published'));
