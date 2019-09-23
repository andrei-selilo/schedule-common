type TrackableBase = {
  createdBy?: any;
  updatedAt?: Date;
  updatedBy?: any;
};

export type Trackable = TrackableBase & {
  createdAt: Date;
};

export type TrackableData = TrackableBase & {
  createdAt?: Date;
};

export default (data: TrackableData = {}): Trackable => ({
  ...data,
  createdAt: (data.createdAt && new Date(data.createdAt)) || new Date(),
});
