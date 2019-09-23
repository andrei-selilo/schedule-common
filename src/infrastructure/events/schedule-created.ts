import { Schedule } from '../../domain/models/schedule';

export type IntegrationEvent = {
  name: string;
  attributes?: string[];
  data: any;
};

export type ScheduleCreatedIntegrationEvent = IntegrationEvent & {
  data: Schedule;
};

export default (data: Schedule): ScheduleCreatedIntegrationEvent => ({
  name: 'schedule/created',
  data,
});
