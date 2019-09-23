import { createConnection } from 'typeorm';
import buildConfigMongo from './build-config';

// TODO: buildConfigMongo
// use creation of the file or dynamic config for the connection from secrets? (file works for migrations and seeds)
export default (secrets) =>
  buildConfigMongo(secrets).then(() => createConnection());
