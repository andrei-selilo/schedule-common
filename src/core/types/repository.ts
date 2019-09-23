export type Repository<T> = {
  get: (query: any) => Promise<T | undefined>;
  save: (aggregate: T) => Promise<T>;
  remove: (aggregate: T) => Promise<T>;
};
