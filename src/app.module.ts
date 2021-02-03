import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateModule } from './create/create.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CreateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
