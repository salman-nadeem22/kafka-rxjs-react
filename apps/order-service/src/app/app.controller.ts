import { Controller, OnModuleInit } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  EventPattern,
  MessagePattern,
  Payload,
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
      },
      consumer: {
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

  @MessagePattern('PROCESS_ORDER')
  processOrder(@Payload() payload) {
    console.log('Processing Order');
    console.log('Order Processing Complete');
    return payload.value;
    // return this.appService.getData();
  }
}
