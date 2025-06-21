import { Global, Module } from '@nestjs/common';
import { UserAccountController } from './controllers/account.controller';
import { UserAuthController } from './controllers/auth.controller';
import { UserAuthService } from './services/auth.service';
import { CacheModule } from 'src/dynamic.module';

@Global()
@Module({
  controllers: [UserAccountController, UserAuthController],
  providers: [UserAuthService],
  exports: [UserAuthService],
  imports: [CacheModule.register({ name: 'file' })],
})
export class UserModule {}
