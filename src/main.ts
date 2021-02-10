import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import fastifyCookie from 'fastify-cookie';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: {
      origin: 'http://localhost:3000',
      credentials: true
    } }
  )
  app.register( fastifyCookie, {
    secret: 'my-secret'
  } )
  await app.listen(3001)
}

bootstrap()
