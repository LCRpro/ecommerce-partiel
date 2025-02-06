import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Product } from 'src/product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Product])  // ✅ Injection des entités Cart et Product
  ],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService]  // ✅ Permet l'utilisation dans d'autres modules
})
export class CartModule {}
