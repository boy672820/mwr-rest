import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
// App main module.
import {AppController} from './app.controller'
import {AppService} from './app.service'
// App modules.
import {RoutineModule} from './routine/routine.module'
import {UsersModule} from './users/users.module'
import {AuthModule} from './auth/auth.module'
import {RecordModule} from './record/record.module'

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        RoutineModule,
        UsersModule,
        AuthModule,
        RecordModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
