import { Publisher } from './publisher';
import { Logger } from './logger';

// TODO: move to infrastructure level
export type HandlerConfig = {
  secrets: any;
  logger: Logger;
  metrics?: any;
  publisher?: Publisher;
};
