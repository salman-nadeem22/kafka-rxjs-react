import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllOrders() {
    return this.appService.getAllOrders();
  }

  @Post()
  createOrder(@Body() data: { productName: string }) {
    return this.appService.createOrder(data.productName);
  }
}
