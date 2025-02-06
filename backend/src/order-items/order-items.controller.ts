import { Controller, Get, Param, Delete } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Get()
  getAllItems() {
    return this.orderItemsService.getAllItems();
  }

  @Get(':orderId')
  getItemsByOrder(@Param('orderId') orderId: number) {
    return this.orderItemsService.getItemsByOrder(orderId);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: number) {
    return this.orderItemsService.deleteItem(id);
  }
}
