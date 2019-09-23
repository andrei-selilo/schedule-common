const configMongo = ({ url }) => ({
  type: 'mongodb',
  name: 'default',
  url,
  synchronize: true,
  logging: false,
  entities: [
    'src/infrastructure/data-providers/mongo/config/entities/**/*{.ts,.js}',
  ],
  subscribers: [
    'src/infrastructure/data-providers/mongo/config/subscribers/**/*{.ts,.js}',
  ],
  migrations: [
    'src/infrastructure/data-providers/mongo/config/migrations/**/*{.ts,.js}',
  ],
  cli: {
    entitiesDir: 'src/infrastructure/data-providers/mongo/config/entities',
    migrationsDir: 'src/infrastructure/data-providers/mongo/config/subscribers',
    subscribersDir: 'src/infrastructure/data-providers/mongo/config/migrations',
  },
});

const configMongoSeed = ({ url }) => ({
  ...configMongo({ url }),
  type: 'mongodb',
  name: 'defaultSeed',
  url,
  migrations: [
    'src/infrastructure/data-providers/mongo/config/seeds/**/*{.ts,.js}',
  ],
  cli: {
    migrationsDir: 'src/infrastructure/data-providers/mongo/config/seeds',
  },
});

export const getMongoConfig = ({ url }: { url: string }): any =>
  configMongo({ url });
export const getMongoSeedConfig = ({ url }: { url: string }): any =>
  configMongoSeed({ url });
