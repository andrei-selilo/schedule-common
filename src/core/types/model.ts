import createTrackable, { Trackable, TrackableData } from './trackable';

export type Model = Trackable & {
  id: string;
};

export type ModelData = TrackableData & {
  id?: Model['id'];
};

export default (data: ModelData = {}): Model => ({
  ...createTrackable(data),
  id: data.id || new Date().toISOString(),
});
