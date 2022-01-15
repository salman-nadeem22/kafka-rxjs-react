import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'order',
        brokers: ['localhost:9092'],
        retry: {
          retries: 5,
        },
      },
      consumer: {
        groupId: 'order-consumer',
      },
    },
  });
  await app.startAllMicroservices();
  Logger.log('Kafka consumer listening');
}

bootstrap();
