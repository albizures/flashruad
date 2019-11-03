module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'r00t',
  database: process.env.DB_NAME || 'flashcards',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV !== 'production',
  entities: ['./src/entities/internals.ts', './src/**/*.entity.ts'],
  migrations: ['./src/migration/**/*.ts'],
  subscribers: ['./src/subscriber/**/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
