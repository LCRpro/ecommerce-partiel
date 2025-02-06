import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Product } from 'src/product/product.entity';
import { User } from 'src/users/user.entity';  // ✅ Import de l'entité User

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Product, User])  // ✅ Injection de User dans TypeORM
  ],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService]
})
export class CartModule {}
