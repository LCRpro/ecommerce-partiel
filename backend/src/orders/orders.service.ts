import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from '../order-items/order-item.entity';
import { Product } from 'src/product/product.entity';

import { CartService } from 'src/cart/cart.service';  // ✅ Import du CartService



@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,          // ✅ Injection correcte
    @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private readonly cartService: CartService
  ) {}


  async validateOrder(userId: number) {
    const cartItems = await this.cartService.getCart(userId);
    if (cartItems.length === 0) {
      throw new Error('Le panier est vide');
    }

    const order = this.orderRepository.create({ userId, status: 'En cours' });
    await this.orderRepository.save(order);

    for (const item of cartItems) {
      const product = await this.productRepository.findOne({ where: { id: item.productId } });
      if (!product || product.stock < item.quantity) {
        throw new Error(`Stock insuffisant pour le produit ${item.productId}`);
      }

      product.stock -= item.quantity;
      await this.productRepository.save(product);

      const orderItem = this.orderItemRepository.create({
        orderId: order.id,
        productId: product.id,
        quantity: item.quantity,
        price: product.price
      });
      await this.orderItemRepository.save(orderItem);
    }

    await this.cartService.clearCart(userId);  // ✅ Vider le panier après validation

    return this.orderRepository.findOne({ where: { id: order.id }, relations: ['items'] });
  }
}
