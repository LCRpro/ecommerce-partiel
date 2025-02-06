import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Injection du repository
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService], // Export du service si nécessaire dans d'autres modules
})
export class ProductsModule {}
