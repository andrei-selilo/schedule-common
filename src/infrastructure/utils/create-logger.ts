import pino from 'pino';
import { tap } from 'ramda';
import { Logger, LoggerExtendConfig } from '../../core/types/logger';

type LoggerConfig = { instance?: any };

const createLogger = ({ instance }: LoggerConfig = {}): Logger => {
  const pinoConfig = {
    // customLevels: {
    //   log: 30
    // }
  };
  const logger = instance || pino(pinoConfig);

  // TODO: find why (methodName: string) => logger[methodName]; throws?
  const createLoggerMethod = (methodName: string) => (...args) =>
    logger[methodName](...args);
  const createLoggerMethodF = (methodName: string) => (...args: any[]) =>
    tap((value) => logger[methodName](...args, value));

  return {
    f: {
      log: createLoggerMethodF('info'),
      info: createLoggerMethodF('info'),
      warn: createLoggerMethodF('warn'),
      error: createLoggerMethodF('error'),
    },
    log: createLoggerMethod('info'),
    info: createLoggerMethod('info'),
    warn: createLoggerMethod('warn'),
    error: createLoggerMethod('error'),
    extend: (config: LoggerExtendConfig) =>
      createLogger({ instance: logger.child(config) }),
  };
};

export default createLogger;
