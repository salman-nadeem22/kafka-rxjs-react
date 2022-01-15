import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'order',
          brokers: ['localhost:9092'],
          retry:{
            retries:5,
          }
        },

      },
    }
  );
  app.listen();
  Logger.log('Kafka consumer listening');
}

bootstrap();
