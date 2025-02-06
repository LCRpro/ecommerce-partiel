import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from 'src/product/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,          // ✅ Injection correcte
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

  async addToCart(userId: number, productId: number, quantity: number) {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product || product.stock < quantity) {
      throw new Error('Produit indisponible ou stock insuffisant');
    }

    const existingItem = await this.cartRepository.findOne({ where: { userId, productId } });
    if (existingItem) {
      existingItem.quantity += quantity;
      return this.cartRepository.save(existingItem);
    } else {
      const newItem = this.cartRepository.create({ userId, productId, quantity });
      return this.cartRepository.save(newItem);
    }
  }

  async getCart(userId: number) {
    return this.cartRepository.find({ where: { userId }, relations: ['product'] });
  }

  async removeFromCart(userId: number, productId: number) {
    await this.cartRepository.delete({ userId, productId });
    return { message: 'Article supprimé du panier' };
  }

  async clearCart(userId: number) {
    await this.cartRepository.delete({ userId });
  }
}
