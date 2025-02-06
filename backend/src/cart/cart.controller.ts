import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Body() body: { userId: number; productId: number; quantity: number }) {
    return this.cartService.addToCart(body.userId, body.productId, body.quantity);
  }

  @Get(':userId')
  async getCart(@Param('userId') userId: number) {
    return this.cartService.getCart(userId);
  }

  @Delete(':userId/:productId')
  async removeFromCart(@Param('userId') userId: number, @Param('productId') productId: number) {
    return this.cartService.removeFromCart(userId, productId);
  }
}
