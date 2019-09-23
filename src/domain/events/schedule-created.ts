import createEvent, { Event } from '../../core/types/event';

export default (): Event => createEvent({ name: 'schedule-created' });
