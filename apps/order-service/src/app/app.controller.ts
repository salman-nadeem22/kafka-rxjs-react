import { Controller, OnModuleInit } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  EventPattern,
  Transport,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
  constructor(private readonly appService: AppService) {}

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'order',
        brokers: ['localhost:9092'],
        retry: {
          retries: 5,
        },
      }, consumer: {
        groupId: 'order-consumer',
      },
    },
  })
  client: ClientKafka;

  onModuleInit() {
    const requestPatterns = ['PROCESS_ORDER'];

    requestPatterns.forEach((pattern) => {
      this.client.subscribeToResponseOf(pattern);
    });
  }

  @EventPattern('PROCESS_ORDER')
  processOrder() {
    console.log('Processing Order');
    console.log('Order Processing Complete');
    // return this.appService.getData();
  }
}
