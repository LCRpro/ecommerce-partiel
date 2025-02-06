import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './order-item.entity';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  providers: [OrderItemsService],
  controllers: [OrderItemsController],
  exports: [OrderItemsService]  // ✅ Permet l'utilisation dans d'autres modules
})
export class OrderItemsModule {}
