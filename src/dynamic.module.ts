import { DynamicModule, Module } from '@nestjs/common';

interface StoreOptions {
  name: string;
}
@Module({})
export class CacheModule {
  static register(options: StoreOptions): DynamicModule {
    return {
      module: CacheModule,
      providers: [{ provide: 'store_option', useValue: options }],
      exports: [],
    };
  }
}
