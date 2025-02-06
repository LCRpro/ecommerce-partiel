import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.entity';
import { OrderItem } from '../order-items/order-item.entity';
import { Product } from '../product/product.entity';
import { Cart } from '../cart/cart.entity';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Product, Cart]),  // ✅ Injection des entités
    CartModule  // ✅ Import du module Cart pour utiliser CartService
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService]  // ✅ Export pour une utilisation externe si nécessaire
})
export class OrdersModule {}
