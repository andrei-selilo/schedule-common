import { Event } from './event';
import { Command } from './command';

type AggregateBase<T> = {
  model?: T;
};

export type Aggregate<T> = AggregateBase<T> & {
  id: string;
  events: Event[];
  commands: Command[];
};

export type AggregateData<T> = AggregateBase<T> & {
  id?: string;
  events?: Event[];
  commands?: Command[];
};

// TODO: It can be non generic? Just return Aggregate type?
export type AggregateAction<Aggregate> = (...args: any[]) => Aggregate;

const createAggregate = <T>(data?: AggregateData<T>): Aggregate<T> => ({
  id: (data && data.id) || new Date().toISOString(),
  events: (data && data.events) || [],
  commands: (data && data.commands) || [],
  model: data && data.model,
});

export const setModel = <T>(aggregate: Aggregate<T>, model: T): Aggregate<T> => createAggregate({ ...aggregate, model });
export const addCommand = <T>(aggregate: Aggregate<T>, command: Command): Aggregate<T> => {
  if (aggregate.commands.some((element) => element.id === command.id)) {
    throw new Error('Command has already been applied');
  }
  return createAggregate({
    ...aggregate,
    // TODO: check if command contians child data
    commands: [...aggregate.commands, command],
  });
};
export const addDomainEvent = <T>(aggregate: Aggregate<T>, event: Event): Aggregate<T> =>
  createAggregate({ ...aggregate, events: [...aggregate.events, event] });
export const clearDomainEvents = <T>(aggregate: Aggregate<T>): Aggregate<T> => createAggregate({ ...aggregate, events: [] });

export default createAggregate;
