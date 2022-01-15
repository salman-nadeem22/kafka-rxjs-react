import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@Inject('ORDER_SERVICE') private orderClient: ClientKafka) {}

  async onModuleInit() {
    const requestPatterns = ['PROCESS_ORDER'];
    requestPatterns.forEach((pattern) => {
      this.orderClient.subscribeToResponseOf(pattern);
    });
    await this.orderClient.connect();
  }

  getAllOrders() {
    return [
      { id: 1, productName: 'Hat' },
      { id: 2, productName: 'Pen' },
    ];
  }

  createOrder(productName: string) {
    return this.orderClient.send(
      'PROCESS_ORDER',
      JSON.stringify({ productName })
    );
  }
}
