import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product/product.entity';
import { Order } from '../orders/order.entity';
import { OrderItem } from '../order-items/order-item.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
  ) {}

  // ✅ Produits
  async getAllProducts() {
    return this.productRepository.find();  // ✅ Retourne un tableau
  }

  async getAllOrders() {
    return this.orderRepository.find({ relations: ['items'] });  // ✅ Retourne un tableau
  }
  async createProduct(productData: any) {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  async updateProduct(id: number, productData: any) {
    const product = await this.productRepository.findOne({ where: { id } });
    
    if (!product) {
      throw new Error(`Produit avec l'ID ${id} non trouvé.`);
    }
  
    // ✅ Vérification des champs à mettre à jour
    product.name = productData.name || product.name;
    product.price = productData.price || product.price;
    product.stock = productData.stock || product.stock;
    product.description = productData.description || product.description;
    product.imageUrl = productData.imageUrl || product.imageUrl;
  
    try {
      return await this.productRepository.save(product);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit :', error);
      throw new Error('Impossible de mettre à jour le produit.');
    }
  }
  
  async deleteProduct(id: number) {
    try {
      const linkedOrders = await this.orderItemRepository.find({ where: { productId: id } });

      if (linkedOrders.length > 0) {
        console.error('❌ Impossible de supprimer un produit lié à des commandes existantes.');
        throw new BadRequestException('Impossible de supprimer un produit lié à des commandes existantes.');
      }

      return await this.productRepository.delete(id);
    } catch (error) {
      console.error('❌ Erreur lors de la suppression du produit :', error.message);
      throw new BadRequestException(error.message || 'Erreur lors de la suppression du produit.');
    }
  }


  async updateOrderStatus(orderId: number, status: 'En cours' | 'Expédiée' | 'Annulée') {
    await this.orderRepository.update(orderId, { status });
    return this.orderRepository.findOne({ where: { id: orderId } });
  }
}
