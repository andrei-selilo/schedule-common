import { Message } from '../../../core/types/message';

// TODO: implement
const mapMessage = (message): Message => ({
  payload: message.body,
  correlationId:
    message.messageAttributes && message.messageAttributes.correlationId && message.messageAttributes.correlationId.stringValue,
  messageReceipt: message.receiptHandle,
  sourceId:
    (message.messageAttributes && message.messageAttributes.correlationId && message.messageAttributes.correlationId.stringValue) ||
    message.messageId,
});

export default (event): Message[] => event.Records.map(mapMessage);
