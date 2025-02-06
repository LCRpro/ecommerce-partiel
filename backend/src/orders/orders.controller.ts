import { Controller, Get, Post, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('validate/:userId')
  async validateOrder(@Param('userId') userId: number) {
    return this.ordersService.validateOrder(userId);
  }

  // ✅ Nouvelle route pour récupérer les commandes d'un utilisateur
  @Get('user/:userId')
  async getOrdersByUser(@Param('userId') userId: number) {
    return this.ordersService.getOrdersByUser(userId);
  }
}
