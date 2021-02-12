import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity'
import { jwtConstants } from 'src/auth/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature( [ UsersEntity ] ),
    JwtModule.register( {
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '14 days' }
    })
  ],
  controllers: [ UsersController ],
  providers: [ UsersService ],
  exports: [ UsersService ] // Use auth module.
})
export class UsersModule {}
