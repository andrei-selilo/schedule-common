import createPublisher from '../../core/types/publisher';

const processMessage = ({ getHandler, secrets, logger, metrics, publisherProvider }) => (message): Promise<any> => {
  // TODO: HOF and cache or earlier correlationId? Find the way to imporve;
  const extendedLogger = logger.extend({ correlationId: message.correlationId });

  const publisher = createPublisher({ logger, provider: publisherProvider });

  const handleMessage = getHandler({ secrets, logger: extendedLogger, metrics, publisher });

  return handleMessage(message);
};

export default ({ parseEvent, deleteMessage, getHandler, metrics, publisherProvider, secrets, logger }) => async (
  event,
): Promise<any[]> => {
  const messages = parseEvent(event);
  const errors: string[] = [];
  const promises = messages.map((message) =>
    processMessage({ getHandler, secrets, logger, metrics, publisherProvider })(message)
      .then(deleteMessage)
      // TODO: remove mutation? (track result instanceof Error)
      .catch((error: Error) => errors.push(error.toString())),
  );

  const result = await Promise.all(promises);

  if (errors.length) {
    logger.error('Errors occured during event handle', errors);
    throw new Error(`Errors occured during event handle: ${JSON.stringify(errors)}`);
  }

  return result;
};
