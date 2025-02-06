import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './order-item.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>
  ) {}

  async getAllItems() {
    return this.orderItemRepository.find({ relations: ['order', 'product'] });
  }

  async getItemsByOrder(orderId: number) {
    return this.orderItemRepository.find({
      where: { orderId },
      relations: ['product']
    });
  }

  async deleteItem(id: number) {
    await this.orderItemRepository.delete(id);
    return { message: 'Article supprimé avec succès' };
  }
}
