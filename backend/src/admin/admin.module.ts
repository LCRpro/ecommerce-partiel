import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/product.entity';
import { Order } from '../orders/order.entity';
import { OrderItem } from '../order-items/order-item.entity';
import { ProductService } from '../product/product.service';
import { OrdersService } from '../orders/orders.service';
import { CartModule } from '../cart/cart.module';  // ✅ Import du CartModule


@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Order, OrderItem]),
    CartModule  // ✅ Ajout ici
  ],
  controllers: [AdminController],
  providers: [AdminService, ProductService, OrdersService],
})
export class AdminModule {}
