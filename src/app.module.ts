import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { Connection } from 'mongoose';

import { CustomLogger, LoggerModule } from './logger';
import config from './config';

@Module({
  imports: [
    // config module to load .env files
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
      load: [...config],
    }),

    // Rate limiting 20 calls in 10 seconds
    ThrottlerModule.forRoot([
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
    ]),

    // database connection module
    MongooseModule.forRootAsync({
      imports: [ConfigModule, LoggerModule],
      useFactory: async (
        configService: ConfigService,
        logger: CustomLogger,
      ) => ({
        uri: configService.get<string>('database.uri'),
        dbName: configService.get<string>('database.dbName'),
        onConnectionCreate: (connection: Connection) => {
          connection.on('connected', () =>
            logger.log('[MongoDB] Connected', 'Mongoose'),
          );
          connection.on('disconnected', () =>
            logger.warn('[MongoDB] Disconnected', 'Mongoose'),
          );
          connection.on('error', (err) =>
            logger.error('[MongoDB] Connection Error', err.stack, 'Mongoose'),
          );
          return connection;
        },
      }),
      inject: [ConfigService, CustomLogger],
    }),

    // logger module
    LoggerModule,

    // other modules
    UserModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
