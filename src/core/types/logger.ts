export type LoggerExtendConfig = { correlationId: string };
type LoggerFunctionalMethod = (...args: any[]) => (value: any) => any;

export type Logger = {
  f: {
    log: LoggerFunctionalMethod;
    info: LoggerFunctionalMethod;
    warn: LoggerFunctionalMethod;
    error: LoggerFunctionalMethod;
  };
  log: any;
  info: any;
  warn: any;
  error: any;
  extend: (config: LoggerExtendConfig) => Logger;
};
