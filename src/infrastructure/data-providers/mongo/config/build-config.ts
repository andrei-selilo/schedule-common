import path from 'path';
import { promises as fs } from 'fs';
import { getMongoConfig, getMongoSeedConfig } from './get-config';

const pathRoot = [__dirname, '../../../../../'];

/**
 * Creates ORM config file (ormconfig.json)
 */
export default async ({ mongo: { url } }): Promise<void> => {
  // TODO: build if not exist?
  const ormConfigPath = path.resolve(...pathRoot, 'ormconfig.json');
  return fs.writeFile(
    ormConfigPath,
    JSON.stringify([getMongoConfig({ url }), getMongoSeedConfig({ url })])
  );
};
