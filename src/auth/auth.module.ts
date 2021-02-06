import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from 'src/users/users.module';

import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'
import { UsersAuthGuard } from './users-auth.guard'

@Module({
  imports: [ PassportModule ],
  providers: [
    AuthService,
    LocalStrategy,
    UsersAuthGuard
  ]
})
export class AuthModule {}
