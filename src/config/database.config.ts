import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  mongo: {
    uri: process.env.MONGODB_URI || '',
    dbName: process.env.MONGO_DB_NAME || 'testing',
  },
  redis: {
    url: process.env.REDIS_CACHE_URL || '',
    host: process.env.REDIS_HOST || '',
    port: process.env.REDIS_CACHE_PORT || '',
    password: process.env.REDIS_CACHE_PASSWORD || '',
  },
}));
