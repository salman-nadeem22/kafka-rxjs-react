import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('ORDER_SERVICE') private orderClient: ClientKafka) {}

  getAllOrders() {
    return [
      { id: 1, productName: 'Hat' },
      { id: 2, productName: 'Pen' },
    ];
  }

  async createOrder(productName: string) {
    this.orderClient.emit('PROCESS_ORDER', { productName })
    return 'OK';
  }
}
