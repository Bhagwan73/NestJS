import {
  BeforeApplicationShutdown,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { Connection } from 'mongoose';
import { createKeyv } from '@keyv/redis';

import { CustomLogger, LoggerModule } from './common/logger';
import config from './config';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppExceptionsFilter } from './common/filters/app-exceptions.filter';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';
import { CacheModule } from '@nestjs/cache-manager';

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
      expandVariables: true,
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
        uri: configService.get<string>('database.mongo.uri'),
        dbName: configService.get<string>('database.mongo.dbName'),
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

    // cache module
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: createKeyv(configService.get<string>('database.redis.url')),
      }),
      inject: [ConfigService],
    }),

    // logger module
    LoggerModule,

    // other modules
    UserModule,
    AdminModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule
  implements
    OnApplicationShutdown,
    BeforeApplicationShutdown,
    OnApplicationBootstrap
{
  constructor(private readonly logger: CustomLogger) {}
  onApplicationBootstrap() {
    this.logger.log('🚀 Application has successfully bootstrapped.');
  }

  beforeApplicationShutdown(signal?: string) {
    this.logger.warn(
      `⚠️ Application is preparing to shut down. Signal: ${signal ?? 'N/A'}`,
    );
  }

  onApplicationShutdown(signal?: string) {
    this.logger.warn(
      `🛑 Application has shut down. Signal: ${signal ?? 'N/A'}`,
    );
  }
}
